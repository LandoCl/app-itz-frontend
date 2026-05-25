import type { MenuItem } from "@/api/types"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

type Props = {
    menuItem: MenuItem;
    addToCart: () => void;
}
export default function MenuItemCard({ menuItem, addToCart }: Props) {
    return (
        <Card className="cursor-pointer" onClick={addToCart}>
            <CardHeader>
                <CardTitle>{menuItem.name}</CardTitle>
            </CardHeader>
            <CardContent>
                ${(menuItem.price)}
            </CardContent>
        </Card>
    )
}
