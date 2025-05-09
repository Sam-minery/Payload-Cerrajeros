import type { SeccionInformativoBlock } from "@/payload-types";
import { cn } from '@/utilities/ui';
import RichText from '@/components/RichText';
import { Media } from '@/components/Media';

type Props = SeccionInformativoBlock & {
    className?: string;
    enableGutter?: boolean;
}

export function SeccionInformativoBlock({ title, content, image, className, enableGutter = true }: Props) {
    return (
        <section className={cn('py-16 bg-gray-100 flex justify-center items-center rounded-xl', {
            '': enableGutter
        }, className)}>
            <div className="w-full max-w-7xl mx-auto">
                {title && (
                    <h2 className="text-4xl font-bold text-black text-center mb-6">{title}</h2>
                )}

                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="w-full md:w-1/2">
                        {content && (
                            <div className="mb-6">
                                <RichText 
                                    data={content} 
                                    enableGutter={false}
                                    enableProse={true}
                                    className="[&_strong]:font-bold [&_strong]:text-black [&_p]:text-black text-xl"
                                />
                            </div>
                        )}
                    </div>

                    {image && (
                        <div className="w-full md:w-1/2">
                            <div className="relative aspect-video w-full">
                                <Media
                                    resource={image}
                                    imgClassName="object-cover rounded-xl"
                                    fill
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
