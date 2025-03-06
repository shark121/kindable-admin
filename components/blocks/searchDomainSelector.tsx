import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import { SearchDomains } from '../../constants/searchDomains';

export default function DomainSelector({
  searchDomain,
  setSearchDomain
}: {
  searchDomain: 'fundraisers' | 'donors';
  setSearchDomain: React.Dispatch<React.SetStateAction<"fundraisers" | "donors">>;
}) {
  return (
    <Select
    onValueChange={(newVal:string)=>setSearchDomain(newVal as "fundraisers" | "donors") }
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Fundraisers" />
      </SelectTrigger>
      <SelectContent>
        {SearchDomains.map((domain) => (
          <SelectItem key={domain} value={domain.toLowerCase()}>
            {domain}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
