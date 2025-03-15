'use client';

import { useSearchParams } from 'next/navigation';
import { arrayContainsMatch } from 'app/helpers/submit/KMP-Seach';
import { Suspense, useEffect, useState } from 'react';
import DomainSelector from '@/components/blocks/searchDomainSelector';
import { ProductsTable } from '../products-table';
import { SearchContext } from '../../../components/context/searchContext';
import { useContext } from 'react';
import CustomerTable from '../customers/customers-table';
import { DonorSchemaType } from '@/lib/types';
import { Ban } from 'lucide-react';
import NotFound from '../../../not-found';

//TODO: clean up the code

export default function Search() {
  const [searchDomain, setSearchDomain] = useState<'fundraisers' | 'donors'>(
    'fundraisers'
  );
  const [searchData, setSearchData] = useState<any>([]);
  const [searchResults, setSearchResults] = useState<any>(new Set());
  const [fundraisers, setFundraisers] = useState<any>([]);
  const [query, setQuery] = useState<string | null>('');
  let searchParams = useSearchParams();
  const { searchQuery } = useContext(SearchContext);

  async function getRequest(domain: string) {
    setSearchResults([]);
    const query = searchParams.get('q');
    const userId = searchParams.get('x_dk');
    setQuery(query);
    const res = await fetch(`/api/data/read/${domain}/${userId}`);
    const data = await res.json();
    return data;
  }


  useEffect(() => {
    getRequest(searchDomain)
      .then((data) => {
        console.log(data);

        if (searchDomain === 'fundraisers') setSearchData(data);
        if (searchDomain === 'donors') {
          setSearchData(data.donors);
          setFundraisers(data.fundraisers);
        }
        console.log(data, 'data from search');
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
        {!query ? 'Search' : 'Search Results for'}
        <div className="text-gray-500 text-[1.5rem]">{query}...</div>
      </div>
      <DomainSelector
        searchDomain={searchDomain}
        setSearchDomain={setSearchDomain}
      />
      {(
        searchDomain === 'fundraisers' ? (
          <ProductsTable
            products={searchDomain === "fundraisers" ? [...searchResults] : []}
            offset={0}
            totalProducts={[...searchResults].length}
            //   keyword="active"
          />
        ) : (
          <CustomerTable
            customers={searchDomain === "donors" ? [...searchResults] : [] as DonorSchemaType[]}
            fundraiser={fundraisers[0]}
          />
        )
      )}
    </div>
  );
}
