import landingImage from "../assets/landing.png"
export default function HomePage() {
  return (
    <div className="flex flex-col gap-12">
        <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
            <h1 className="text-5xl font-bold tracking-tight text-orange-600">Disfruta de tu comida para llevar</h1>
            <span className="text-x1">
                ¡Tu comida está a un solo click!
            </span>
            <div className="grid md:grid-cols-2 gap-5">
                <img src={landingImage}/>
                <div className="flex flex-col items center justify-center gap-4 text center">
                    <span className="font-bold text-3xl tracking-tighter">
                        Pide comida para llevar aun mas rapido
                    </span>
                </div>
            </div>
        </div>
    </div>
  )
}
