import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function () {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>ደብዳቤ መምሪያ</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>የ ደብዳቤ መምሪያ</DialogTitle>
          <DialogDescription>
            <section className="flex flex-col gap-5 mx-8">
              {/* <h2 className="font-semibold text-lg">የ ደብዳቤ መምሪያ</h2> */}
              <div className="grid gap-5">
                <div className="grid items-center gap-1.5">
                  <Label htmlFor="የተቀባይ ስም">ለ</Label>
                  <Input type="text" id="የተቀባይ ስም" value="አማረ ተፈሪ " />
                </div>
                <div className="grid items-center gap-1.5"></div>
                <Label htmlFor="የተቀባይ ስም">መልክት ማስቀመጫ</Label>
                <Textarea
                  id="ደብዳቤ"
                  className="bg-gray-100 h-[100px]"
                  value="ከሰላምታ ጋር"
                />
              </div>
              <Label htmlFor="የተቀባይ ስም" className="mt-7">
                ፊርማ
              </Label>
              <section className="flex flex-col justify-center items-center cursor-pointer hover:backdrop-brightness-95 w-[410px] h-[200px] mt-0 mb-3 bg-gray-100">
                <p className="text-center text-gray-600">
                  እባክዎን የፊርማ ሰሌዳውን እዚህ ጠቅ ያድርጉ ፊርማዎን ለማስገባት
                  <br /> ወይም
                </p>
                <Button className="h-[35px] w-[200px] bg-gray-700 mt-3 mr-3">
                  ቀድሞ የተቀዳ ፊርማ ይጠቀሙ
                </Button>
              </section>
              <div className="flex justify-end">
                <Button
                  className="h-[45px] w-20 ml-4 mr-3 "
                  variant="secondary"
                >
                  ሰርዝ
                </Button>
                <Button className="h-[45px] w-20 mr-0">ምራ</Button>
              </div>
            </section>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
