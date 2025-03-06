'use client';

import { useSearchParams } from 'next/navigation';
import { arrayContainsMatch } from 'app/helpers/submit/KMP-Seach';
import { useEffect, useState } from 'react';
import DomainSelector from '@/components/blocks/searchDomainSelector';
import { ProductsTable } from '../products-table';
import { SearchContext } from '../../../components/context/searchContext';
import { useContext } from 'react';
import CustomerTable from '../customers/customers-table';
import { DonorSchemaType } from '@/lib/types';

//TODO: clean up the code

export default function Search() {
  const [searchDomain, setSearchDomain] = useState<'fundraisers' | 'donors'>(
    'fundraisers'
  );
  const [searchData, setSearchData] = useState<any>([]);
  const [searchResults, setSearchResults] = useState<any>(new Set());
  const [query, setQuery] = useState<string | null>('');
  let searchParams = useSearchParams();
  const { searchQuery } = useContext(SearchContext);

  async function getRequest(domain: string) {
    const query = searchParams.get('q');
    console.log(window.location.search, 'search');
    setQuery(query);
    console.log(query, 'query');
    const res = await fetch(`/api/data/read/${domain}/`);
    setSearchResults([]);
    const data = await res.json();
    return data;
  }

  //   useEffect(() => {
  //     getRequest(searchDomain)
  //       .then((data) => {
  //         console.log(data);
  //         setSearchData(data);
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   }, []);

  useEffect(() => {
    getRequest(searchDomain)
      .then((data) => {
        console.log(data);
        setSearchData(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [searchQuery, searchDomain]);

  useEffect(() => {
    for (let el of searchData) {
      if (query && arrayContainsMatch(Object.values(el), query)) {
        setSearchResults((prev: any) => [...prev, el]);
      }
    }
  }, [searchData]);

  console.log(searchResults, 'searchResults');

  return (
    <div className="flex flex-col gap-6">
      <div className="font-bold text-[2rem] flex items-center gap-6">
        Search for
        <div className="text-gray-500 text-[1.5rem]">{query}...</div>
      </div>
      <DomainSelector
        searchDomain={searchDomain}
        setSearchDomain={setSearchDomain}
      />
      {searchDomain === 'fundraisers' ? (
        <ProductsTable
          products={[...searchResults]}
          offset={0}
          totalProducts={[...searchResults].length}
          //   keyword="active"
        />
      ) : (
        <CustomerTable customers={[...searchResults] as DonorSchemaType[]} />
      )}
    </div>
  );
}
