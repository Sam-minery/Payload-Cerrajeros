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
        <section className={cn('py-8 md:py-16 bg-gray-50 flex justify-center items-center', {
            '': enableGutter
        }, className)}>
            <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
                {title && (
                    <h2 className="text-2xl md:text-4xl font-bold text-black text-center mb-4 md:mb-6">{title}</h2>
                )}

                {contentSection && (
                    <div className="mb-8 md:mb-12 text-center">
                        <RichText 
                            data={contentSection} 
                            enableGutter={false}
                            enableProse={true}
                            className="[&_strong]:font-bold [&_strong]:text-black [&_p]:text-black text-lg md:text-xl" 
                        />
                    </div>
                )}

                <div className={cn('grid gap-4 md:gap-8 place-items-center', getGridCols())}>
                    {servicios?.map((servicio, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-3 rounded-xl w-full h-[220px] md:h-[200px]">
                            <div className="flex items-center gap-2 mb-4 md:mb-6">
                                {servicio.image && (
                                    <div className="w-12 h-12 md:w-16 md:h-16 relative">
                                        <Media
                                            resource={servicio.image}
                                            imgClassName="object-contain"
                                        />
                                    </div>
                                )}
                                {servicio.titleServices && (
                                    <h3 className="text-base md:text-lg font-bold text-black">{servicio.titleServices}</h3>
                                )}
                            </div>

                            {servicio.content && (
                                <div className="mb-2 flex-grow overflow-hidden">
                                    <RichText 
                                        data={servicio.content} 
                                        enableGutter={false}
                                        enableProse={true}
                                        className="[&_strong]:font-bold [&_strong]:text-black [&_p]:text-black text-sm md:text-base" 
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