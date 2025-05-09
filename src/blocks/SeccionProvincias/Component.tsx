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
      <div className="max-w-6xl mx-auto bg-gray-100 rounded-2xl p-4"> 
        {nombreSeccionProvincias && ( 
          <h2 className="text-xl font-bold text-gray-700 mb-6 text-center"> 
            {nombreSeccionProvincias} 
          </h2> 
  )} 
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 divide-y lg:divide-y-0 lg:divide-x divide-gray-200"> 
  {paginasRelacionadas?.map((pagina) => ( 
  <div 
    key={pagina.id} 
    className="block p-4 hover:bg-gray-50 transition-colors duration-200" > 
  <div className="flex items-center"> 
  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span> 
  <CMSLink 
  type="custom" 
  url={`/${pagina.slug}`} 
  label={pagina.title} 
  className="text-sm text-gray-600 hover:text-gray-900" /> 
  </div>
   </div>
   ))} 
  </div> 
  </div> 
  </section> 
  );
  };