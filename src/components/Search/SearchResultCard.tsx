import type { Restaurante } from "@/api/types";
import { AspectRatio } from "../ui/aspect-ratio";
import { Link } from "react-router";
import { Banknote, Clock, Dot } from "lucide-react";

type Props = {
    restaurante: Restaurante;
}
export default function SearchResultCard({ restaurante }: Props) {
    return (
        <Link to={'/detail/' + restaurante._id}
            className="grid lg:grid-cols-[2fr_3fr] gap-5 group">
            <AspectRatio ratio={16 / 6}>
                <img src={restaurante.imageUrl} className="rounded-md object-cover h-full w-full" />
            </AspectRatio>
            <div>
                <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:underline">
                    {restaurante.restauranteName}
                </h3>
                <div id="card-content" className="grid md:grid-cols-2 gap-2">
                    <div className="flex flex-row flex-wrap">
                        {
                            restaurante.cuisines.map((item, index) => (
                                <span className="flex items-center" key={index}>
                                    <span>{item}</span>
                                    {
                                        index < restaurante.cuisines.length - 1 && <Dot />
                                    }
                                </span>
                            ))
                        }
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1 text-green-600">
                            <Clock className="text-green-600" />
                            {restaurante.estimatedDeliveryTime} mins
                        </div>
                        <div className="flex items-center gap-1">
                            <Banknote />
                            Entrega por ${restaurante.deliverPrice}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
