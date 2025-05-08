import type { SeccionServiciosBlock } from "@/payload-types";
import { cn } from '@/utilities/ui';
import RichText from '@/components/RichText';
import { Media } from '@/components/Media';

type Props = SeccionServiciosBlock & {
  className?: string;
  enableGutter?: boolean;
}

export function SeccionServiciosBlock({ title, contentSection, servicios, className, enableGutter = true }: Props) {
    const getGridCols = () => {
        if (!servicios?.length) return 'grid-cols-1';
        if (servicios.length === 1) return 'grid-cols-1';
        if (servicios.length === 2) return 'grid-cols-1 md:grid-cols-2';
        if (servicios.length === 3) return 'grid-cols-1 md:grid-cols-3';
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
    };
    return (
        <section className={cn('py-16 bg-gray-400 flex justify-center items-center', {
            'container': enableGutter
        }, className)}>
            <div className="w-full max-w-7xl mx-auto">
                {title && (
                    <h2 className="text-4xl font-bold text-white text-center mb-6">{title}</h2>
                )}

                {contentSection && (
                    <div className="mb-12 text-center">
                        <RichText 
                            data={contentSection} 
                            enableGutter={false}
                            enableProse={true}
                            className="[&_strong]:font-bold [&_strong]:text-white [&_p]:text-white text-xl" 
                        />
                    </div>
                )}

                <div className={cn('grid gap-8 place-items-center', getGridCols())}>
                    {servicios?.map((servicio, index) => (
                        <div key={index} className="flex flex-col items-center text-center bg-black/10 p-3 rounded-lg w-full h-[200px] transition-all duration-300 hover:bg-black/20 hover:scale-105 hover:shadow-lg cursor-pointer">
                            <div className="flex items-center gap-4 mb-6">
                                {servicio.image && (
                                    <div className="w-16 h-16 relative">
                                        <Media
                                            resource={servicio.image}
                                            imgClassName="object-contain"
                                        />
                                    </div>
                                )}
                                {servicio.titleServices && (
                                    <h3 className="text-xl font-bold text-white">{servicio.titleServices}</h3>
                                )}
                            </div>

                            {servicio.content && (
                                <div className="mb-2 flex-grow overflow-y-auto">
                                    <RichText 
                                        data={servicio.content} 
                                        enableGutter={false}
                                        enableProse={true}
                                        className="[&_strong]:font-bold [&_strong]:text-white [&_p]:text-white" 
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}