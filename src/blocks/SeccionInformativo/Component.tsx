"use client";

import type { SeccionInformativoBlock } from "@/payload-types";
import { cn } from '@/utilities/ui';
import RichText from '@/components/RichText';
import { Media } from '@/components/Media';
import { useEffect, useRef } from 'react';

export type Props = SeccionInformativoBlock & {
    className?: string;
    enableGutter?: boolean;
}

export function SeccionInformativoBlock({ title, content, image, className, enableGutter = true }: Props) {
    const contentRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target === contentRef.current) {
                        entry.target.classList.add('animate-fade-in-left');
                    } else if (entry.target === imageRef.current) {
                        entry.target.classList.add('animate-fade-in-right');
                    }
                }
            });
        }, { threshold: 0.1 });

        if (contentRef.current) observer.observe(contentRef.current);
        if (imageRef.current) observer.observe(imageRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <section className={cn('py-8 md:py-16 flex justify-center items-center', {
            '': enableGutter
        }, className)}>
            <div className="w-full max-w-7xl mx-auto px-4 md:px-0">
                {title && (
                    <h2 className="text-2xl md:text-4xl font-bold text-black text-center mb-4 md:mb-6">
                        {title}
                    </h2>
                )}

                <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
                    <div 
                        ref={contentRef}
                        className="w-full md:w-1/2 opacity-0"
                    >
                        {content && (
                            <div className="mb-4 md:mb-6">
                                <RichText 
                                    data={content} 
                                    enableGutter={false}
                                    enableProse={true}
                                    className="[&_strong]:font-bold [&_strong]:text-black [&_p]:text-black text-base md:text-xl"
                                />
                            </div>
                        )}
                    </div>

                    {image && (
                        <div 
                            ref={imageRef}
                            className="w-full md:w-1/2 opacity-0"
                        >
                            <div className="relative aspect-video w-full">
                                <Media
                                    resource={image}
                                    imgClassName="object-cover rounded-xl"
                                    fill
                                    priority={true}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
