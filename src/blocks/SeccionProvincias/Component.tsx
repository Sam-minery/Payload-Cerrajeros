import React from 'react';
import { CMSLink } from '@/components/Link';
import type { Page } from '@/payload-types';

interface Props {
  paginasRelacionadas: Page[];
  nombreSeccionProvincias?: string;
}

export const SeccionProvinciasBlock: React.FC<Props> = ({ paginasRelacionadas, nombreSeccionProvincias }) => {
  return (
    <section className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {nombreSeccionProvincias && (
          <h2 className="text-lg font-medium text-gray-700 mb-6 text-center">
            {nombreSeccionProvincias}
          </h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
          {paginasRelacionadas?.map((pagina) => (
            <div
              key={pagina.id}
              className="block p-4 hover:bg-gray-50 transition-colors duration-200"
            >
              <CMSLink
                type="custom"
                url={`/${pagina.slug}`}
                label={pagina.title}
                className="text-sm text-gray-600 hover:text-gray-900 block pl-5"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
