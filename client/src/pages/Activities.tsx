import DialogContainer from "@/components/DialogContainer";
import AddActivityForm from "@/components/forms/AddActivityForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatDataNumeric } from "@/lib/utils";
import { activityQueryOptions } from "@/queryOptions/activityQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { Delete, Edit, Plus } from "lucide-react";

interface Activity {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  scheduledDate: Date;
}
export default function Activities() {
  const { data } = useQuery(activityQueryOptions());

  return (
    <div>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-semibold'>Activities</h1>
        <DialogContainer
          triggerButton={
            <Button className='cursor-pointer'>
              <Plus />
              Add new
            </Button>
          }
          title='Add New Activity'
        >
          <AddActivityForm />
        </DialogContainer>
      </div>
      <div className=''>
        {data && data.length > 0 ? (
          <div className='grid grid-cols-3 gap-5 mt-10'>
            {data.map((item: Activity) => (
              <Card key={item.id} className='p-3 w-[310px]'>
                <div className='flex justify-between'>
                  <div>
                    <h1 className='text-lg font-semibold'>{item.title}</h1>
                    <div className='flex items-center gap-1'>
                      <span className='text-xs text-muted-foreground font-semibold'>
                        Date:
                      </span>
                      <span className='text-xs text-muted-foreground'>
                        {formatDataNumeric(new Date(item.createdAt))} -{" "}
                        {formatDataNumeric(new Date(item.scheduledDate))}
                      </span>
                    </div>
                  </div>
                  <div className='flex  gap-2'>
                    <Edit className='w-5 h-5 stroke-[1.5px] text-blue-400' />
                    <Delete className='w-5 h-5 stroke-[1.5px] text-red-400' />
                  </div>
                </div>
                <div className='text-muted-foreground'>
                  <p>{item.description}</p>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div>No activity yet</div>
        )}
      </div>
    </div>
  );
}
