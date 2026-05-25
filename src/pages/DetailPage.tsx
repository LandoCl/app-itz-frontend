import { useGetRestauranteById } from "@/api/RestauranteApi";
import type { CartItem, MenuItem } from "@/api/types";
import LoadingButton from "@/components/LoadingButton";
import CheckOutButton from "@/components/Search/CheckOutButton";
import MenuItemCard from "@/components/Search/MenuItemCard";
import OrderSummary from "@/components/Search/OrderSummary";
import RestaurantInfo from "@/components/Search/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import type { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { useState } from "react";
import { useParams } from "react-router"
import { useCreateCheckOutSession } from "@/api/OrderApi";

export default function DetailPage() {
    const { restaurantId } = useParams();
    const { data: restaurante, isLoading } = useGetRestauranteById(restaurantId)
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const storedCartItems = sessionStorage.getItem('cartItems-' + restaurantId)
        return storedCartItems ? JSON.parse(storedCartItems) : []
    });
    const createCheckOutSessionRequest = useCreateCheckOutSession();

    const addToCart = (menuItem: MenuItem) => {
        setCartItems((prevCartItems: CartItem[]): CartItem[] => {
            const existingCartItem = prevCartItems.find(
                (cartItem) => cartItem._id === menuItem._id
            )
            let updateCartItems
            if (existingCartItem) {
                updateCartItems = prevCartItems.map((cartItem) =>
                    cartItem._id === menuItem._id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem)
            } else {
                updateCartItems = [
                    ...prevCartItems,
                    {
                        _id: menuItem._id,
                        name: menuItem.name,
                        price: menuItem.price,
                        quantity: 1
                    }
                ]
            }
            sessionStorage.setItem(
                'cartItems-' + restaurantId, JSON.stringify(updateCartItems)
            )
            return updateCartItems
        })
    }
    const removeFromCart = (cartItem: CartItem) => {
        setCartItems((prevCartItems) => {
            const updateCartItems = prevCartItems.filter(
                (item) => cartItem._id !== item._id
            )
            return updateCartItems
        })
    }
    const onCheckOut = async (userFormData: UserFormData) => {
        // console.log("UserFormData", userFormData);
        if (!restaurante) return;
        const checkOutData = {
            cartItems: cartItems.map((cartItem) => ({
                menuItemId: cartItem._id,
                name: cartItem.name,
                quantity: cartItem.quantity.toString()
            })),
            restaurantId: restaurante._id,
            deliveryDetails: {
                name: userFormData.name,
                address: userFormData.address,
                city: userFormData.city,
                country: userFormData.country,
                email: userFormData.email as string
            }
        }
        createCheckOutSessionRequest.mutate(checkOutData, {
            onSuccess: (data) => {
                window.location.href = data.url
            }
        })
    }

    if (isLoading || !restaurante) return (<LoadingButton />)
    return (
        <div className="flex flex-col gap-10">
            <AspectRatio ratio={16 / 5}>
                <img src={restaurante.imageUrl} className="rounded-md object-cover h-full w-full" />
            </AspectRatio>
            <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
                <div className="flex flex-col gap-4">
                    <RestaurantInfo restaurant={restaurante} />
                    <span className="text-2xl font-bold tracking-tight">Menu</span>
                    {
                        restaurante.menuItems.map((menuItem, key) => (
                            <MenuItemCard menuItem={menuItem} key={key}
                                addToCart={() => addToCart(menuItem)} />
                        ))
                    }
                </div>
                <Card>
                    <OrderSummary
                        restaurant={restaurante}
                        cartItems={cartItems}
                        removeFromCart={removeFromCart} />
                    <CardFooter>
                        <CheckOutButton
                            disabled={cartItems.length === 0}
                            onCheckOut={onCheckOut} />
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
