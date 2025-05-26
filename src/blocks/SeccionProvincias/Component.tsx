import React from 'react';
import { CMSLink } from '@/components/Link';
import type { Page, Provincia } from '@/payload-types';

interface Props {
  paginasRelacionadas?: Page[];
  provinciasRelacionadas?: Provincia[];
  nombreSeccionProvincias?: string;
}

export const SeccionProvinciasBlock: React.FC<Props> = ({ 
  paginasRelacionadas, 
  provinciasRelacionadas, 
  nombreSeccionProvincias 
}) => { 
  // Debug temporal - eliminar después
  console.log('paginasRelacionadas:', paginasRelacionadas);
  console.log('provinciasRelacionadas:', provinciasRelacionadas);
  
  // Combinar ambas collections en un solo array con validación de datos
  const itemsRelacionados = [
    ...(paginasRelacionadas || [])
      .filter(item => item && item.id && item.slug && item.title)
      .map((item, index) => ({ ...item, type: 'page' as const, uniqueKey: `page-${item.id}-${index}` })),
    ...(provinciasRelacionadas || [])
      .filter(item => item && item.id && item.slug && item.title)
      .map((item, index) => ({ ...item, type: 'provincia' as const, uniqueKey: `provincia-${item.id}-${index}` }))
  ];

  return ( 
    <section className="py-8 px-4"> 
      <div className="max-w-8xl mx-auto rounded-2xl p-4"> 
        {nombreSeccionProvincias && ( 
          <h2 className="text-3xl font-bold text-gray-700 mb-10 text-center text-red-500"> 
            {nombreSeccionProvincias} 
          </h2> 
        )} 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"> 
          {itemsRelacionados?.map((item) => {
            const baseUrl = item.type === 'provincia' ? '/provincias' : '';
            const url = `${baseUrl}/${item.slug}`;
            
            return (
              <div 
                key={item.uniqueKey}
                className="block p-4 hover:bg-gray-50 transition-colors duration-200"
              > 
                <div className="flex flex-col"> 
                  <div className="flex items-center justify-start w-full mb-2"> 
                    <div className="flex items-center min-w-[85px]">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                      <span className="text-xs text-green-500">Disponible</span>
                    </div>
                    <CMSLink 
                      type="custom" 
                      url={url} 
                      label={item.title} 
                      className="text-sm text-gray-600 hover:text-gray-900" 
                    /> 
                  </div>
                  <div className="w-full h-[1px] bg-gray-200"></div>
                </div>
              </div>
            );
          })} 
        </div> 
      </div> 
    </section> 
  );
};