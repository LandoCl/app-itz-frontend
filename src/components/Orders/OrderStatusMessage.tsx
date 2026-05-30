import { FaCheckCircle, FaClipboardList, FaClock, FaTimesCircle, FaTruck } from "react-icons/fa";
import { FaKitchenSet } from "react-icons/fa6";

type Props = {
    status: string
}

export default function OrderStatusMessage({ status }: Props) {
    if (status === "placed")
        return (
            <div className="text-red-500 text-2xl flex">
                <FaClipboardList className="mr-2" />
                Recibida
            </div>
        )
    if (status === "paid")
        return (
            <div className="text-orange-500 text-2xl flex">
                <FaCheckCircle className="mr-2" />
                Esperando confirmacion del restaurante
            </div>
        )
    if (status === "inProgress")
        return (
            <div className="text-yellow-500 text-2xl flex">
                <FaKitchenSet className="mr-2" />
                En progreso
            </div>
        )
    if (status === "outForDelivery")
        return (
            <div className="text-green-300 text-2xl flex">
                <FaTruck className="mr-2" />
                En reparto
            </div>
        )
    if (status === "delivered")
        return (
            <div className="text-green-500 text-2xl flex">
                <FaCheckCircle className="mr-2" />
                Entregada
            </div>
        )
    return (
        <div className="text-red-500 text-2xl flex">
            <FaCheckCircle className="mr-2" />
            Estado invalido
        </div>
    )
}
