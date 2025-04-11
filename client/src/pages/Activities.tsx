import { deleteActivity } from "@/actions/activity";
import DialogContainer from "@/components/DialogContainer";
import AddActivityForm from "@/components/forms/AddActivityForm";
import EditActivityForm from "@/components/forms/EditActivityForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatDataNumeric } from "@/lib/utils";
import { activityQueryOptions } from "@/queryOptions/activityQueryOptions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CircleHelp, Delete, Edit, Plus } from "lucide-react";
import toast from "react-hot-toast";

interface Activity {
  _id: string;
  title: string;
  description: string;
  createdAt: Date;
  scheduledDate: Date;
}
export default function Activities() {
  const queryClient = useQueryClient();
  const { data } = useQuery(activityQueryOptions());

  const handleDeleteActivity = async (id: string) => {
    await deleteActivity(id)
      .then(async (data) => {
        if (data.error) {
          toast.error(data.error);
          return;
        }
        toast.success("Activity deleted successfully!");
        await queryClient.invalidateQueries({ queryKey: ["activities"] });
      })
      .catch((err) => {
        console.error("Error in deleting activity", err);
        toast.error("An unexpected error occurred");
      });
  };

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
              <Card key={item._id} className='p-3 w-[310px]'>
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
                    <DialogContainer
                      triggerButton={
                        <Button size='icon' variant='ghost'>
                          <Edit className='w-5 h-5 stroke-[1.5px] text-blue-400' />
                        </Button>
                      }
                      title='Edit Activity'
                    >
                      <EditActivityForm itemId={item._id} />
                    </DialogContainer>
                    <DialogContainer
                      triggerButton={
                        <Button size='icon' variant='ghost'>
                          <Delete className='w-5 h-5 stroke-[1.5px] text-red-400' />
                        </Button>
                      }
                      title=''
                    >
                      <div className='mt-5 flex flex-col items-center gap-3 justify-center p-0'>
                        <h1 className='text-lg'>Are you Sure ?</h1>
                        <CircleHelp className='w-14 h-14 text-red-500' />
                        <Button
                          className='cursor-pointer'
                          variant='destructive'
                          onClick={() => handleDeleteActivity(item._id)}
                        >
                          Confirm
                        </Button>
                      </div>
                    </DialogContainer>
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
