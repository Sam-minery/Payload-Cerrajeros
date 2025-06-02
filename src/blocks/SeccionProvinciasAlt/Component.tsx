import React from 'react';
import { CMSLink } from '@/components/Link';
import type { Page, Provincia, Municipio } from '@/payload-types';

type RelatedDocument = {
  pagina: {
    relationTo: 'pages' | 'provincias';
    value: Page | Provincia;
  };
  estado: 'disponible' | 'no_disponible';
}

interface Props {
  items: RelatedDocument[];
  titulo?: string;
}

export const SeccionProvinciasAltBlock: React.FC<Props> = ({ items, titulo }) => { 
  return ( 
    <section className="py-8 px-4"> 
      <div className="max-w-6xl mx-auto p-4"> 
        {titulo && ( 
          <h2 className="text-xl font-bold text-gray-700 mb-6 text-center"> 
            {titulo} 
          </h2> 
        )} 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 divide-y lg:divide-y-0 lg:divide-x divide-gray-200"> 
          {items?.map((documento, index) => {
            const pagina = documento.pagina.value;
            const baseUrl = documento.pagina.relationTo === 'provincias' ? '/provincias' : '';
            const isDisponible = documento.estado === 'disponible';
            
            return (
              <div 
                key={`${index}-${documento.pagina.relationTo}-${pagina.id}-${documento.estado}`} 
                className="block p-4 hover:bg-gray-50 transition-colors duration-200"
              > 
                <div className="flex items-center"> 
                  <span className={`w-2 h-2 rounded-full mr-2 animate-pulse ${isDisponible ? 'bg-green-500' : 'bg-red-500'}`}></span> 
                  <CMSLink 
                    type="custom" 
                    url={`${baseUrl}/${pagina.slug}`} 
                    label={pagina.title} 
                    className={`text-sm ${isDisponible ? 'text-green-600 hover:text-green-800' : 'text-red-600 hover:text-red-800'}`}
                  /> 
                </div>
              </div>
            );
          })} 
        </div> 
      </div> 
    </section> 
  );
};