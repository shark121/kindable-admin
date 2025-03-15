import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import { FundraiserSchemaType } from '@/lib/types';

export default function FundraiserSelector({
  fundraisers,
  searchDomain,
  setSearchDomain
}: {
  fundraisers: FundraiserSchemaType[] | undefined;
  searchDomain: string;
  setSearchDomain: React.Dispatch<React.SetStateAction<FundraiserSchemaType | undefined>>;
}) {
  return (
    fundraisers && (
      <Select
        onValueChange={(newVal: string) =>
          setSearchDomain(
            fundraisers.find(
              (fundraiser) =>
                fundraiser.id === newVal
            ) as FundraiserSchemaType
          )
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={searchDomain} />
        </SelectTrigger>
        <SelectContent>
          {fundraisers.map((fundraiser) => (
            <SelectItem
              key={fundraiser.id}
              value={fundraiser.id}
            >
              {fundraiser.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  );
}
