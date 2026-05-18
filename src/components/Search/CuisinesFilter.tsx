import type { ChangeEvent } from "react";
import { cuisineList } from "@/config/restaurant-options-config";
import { Label } from "../ui/label";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "../ui/button";

type Props = {
    onChange: (cuisines: string[]) => void;
    selectedCusines: string[];
    isExpanded: boolean;
    onExpandedClick: () => void;
}

export default function CuisinesFilter({ onChange, selectedCusines, isExpanded, onExpandedClick }: Props) {
    const handleCuisinesReset = () => onChange([]);
    const handleCuisinesChange = (event: ChangeEvent<HTMLInputElement>) => {
        const clickedCuisine = event.target.value;
        const isChecked = event.target.checked;

        const newCuisinesList = isChecked ? [...selectedCusines, clickedCuisine]
            : selectedCusines.filter((cuisine) => cuisine !== clickedCuisine)
        onChange(newCuisinesList);
    }
    return (
        <>
            <div className="flex justify-between items-center px-2">
                <div className="text-md font-semibold mb-2">
                    Filtrar por tipo de cocina
                </div>
                <div onClick={handleCuisinesReset}
                    className="text-sm font-semibold mb-2 underline cursor-pointer text-blue-500">
                    Limpiar filtro
                </div>
            </div>
            <div className="space-y-2 flex flex-col">
                {
                    cuisineList.slice(0, isExpanded ? cuisineList.length : 7).map((cuisine) => {
                        const isSelected = selectedCusines.includes(cuisine);
                        return <div className="flex" key={cuisine}>
                            <input id={`cuisine_${cuisine}`}
                                type="checkbox"
                                className="hidden"
                                value={cuisine}
                                checked={isSelected}
                                onChange={handleCuisinesChange}
                            />
                            <Label htmlFor={`cuisine_${cuisine}`} key={cuisine}
                                className={
                                    `flex flex-1 items-center cursor-pointer text-sm
                                    rounded-full px-4 py-2 font-semibold 
                                    ${isSelected ? "border border-green-600 text-green-600"
                                        : "border border-slate-300"
                                    }`
                                }
                            >
                                {isSelected && <Check size={20} strokeWidth={3} />}
                                {cuisine}
                            </Label>
                        </div>
                    })
                }
                <Button
                    onClick={onExpandedClick}
                    variant="link" className="mt-4 flex-1"
                >
                    {
                        isExpanded ? (
                            <span className="flex flex-row items-center text-sm text-orange-500 cursor-pointer">
                                Mostrar Menos <ChevronUp />
                            </span>
                        ) : (
                            <span className="flex flex-row items-center text-sm text-orange-500 cursor-pointer">
                                Mostrar Mas <ChevronDown />
                            </span>
                        )
                    }
                </Button>
            </div>
        </>
    )
}