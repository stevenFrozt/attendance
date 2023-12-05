"use client"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardTitle } from "@/components/ui/card"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { QrScanner } from "@yudiel/react-qr-scanner"
import {
  Check,
  ChevronsUpDownIcon,
  MoveRightIcon,
  SlidersHorizontalIcon
} from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

type CameraDevice = { label: string; id: string }

export default function Home() {
  const [constrains, setConstraints] = useState({
    facingMode: "user",
    aspectRatio: 1 / 1
  })

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [cameraDevice, setCameraDevice] = useState<CameraDevice[]>([])

  useEffect(() => {
    if (!navigator.mediaDevices?.enumerateDevices) {
      console.log("enumerateDevices() not supported.")
    } else {
      // List cameras and microphones.
      navigator.mediaDevices
        .enumerateDevices()
        .then(devices => {
          devices
            .filter(item => item.kind === "videoinput")
            .map(device => {
              console.log(device)
              setCameraDevice(prev => [
                ...prev,
                { label: device.label, id: device.deviceId }
              ])
            })
          //   const temp = []
          //   temp.push(device)
          //   const new = Array.from(new Set(temp))
          //   console.log(temp)
        })
        .catch(err => {
          console.error(`${err.name}: ${err.message}`)
        })
    }

    // console.log("TT:", cameraDevice)

    // Usage
    if (isMobileDevice()) {
      console.log("This is a mobile device.")
    } else if (isTabletDevice()) {
      console.log("This is a tablet device.")
    } else {
      console.log("This is a desktop device.")
    }
  }, [])

  // Check if the user is using a mobile device
  function isMobileDevice() {
    return /iPhone|iPad|iPod|Android|Mobile|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator?.userAgent
    )
  }

  // Check if the user is using a tablet device
  function isTabletDevice() {
    return /iPad|Android|Tablet/i.test(navigator?.userAgent)
  }

  return (
    <main className="bg-gradient-to-br from-gray-900 to-gray-600 min-h-screen">
      <nav className="py-4 px-10 flex justify-between items-center text-white">
        <h1 className="font-bold text-lg  ">LOGO HERE</h1>
        <h1 className="flex items-center gap-2">
          Admin Dashboard <MoveRightIcon />
        </h1>
      </nav>
      <div className="flex items-center gap-16 justify-center mt-6 ">
        {/* RECENT CARD */}
        <div className="w-[30%]">
          <Card className="drop-shadow-xl p-6">
            <CardTitle>Recent</CardTitle>
            <div className="my-4"></div>
            {/* <Separator className="my-6" /> */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">John Doe</TableCell>
                  <TableCell>Login</TableCell>
                  <TableCell className="text-right">10:00 AM</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">John Doe</TableCell>
                  <TableCell>Login</TableCell>
                  <TableCell className="text-right">10:00 AM</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </div>
        {/* SCANNER CARD */}
        <div className="w-[50%] ">
          <Card className="drop-shadow-xl flex p-6 gap-8">
            <div className="w-full">
              <div className="w-full bg-slate-800 h-[26.5rem] border rounded-md overflow-hidden relative">
                <QrScanner
                  //
                  constraints={{ facingMode: "user", aspectRatio: 1 / 1 }}
                  onDecode={result => console.log(result)}
                  onError={error => console.log(error?.message)}
                />
                <div className="self-start pt-2 absolute bottom-2  right-2 z-10">
                  <Popover>
                    <PopoverTrigger asChild>
                      <SlidersHorizontalIcon className="w-6 h-6 text-white" />
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">
                            Camera Settings
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Set the Camera for the QR Scanner.
                          </p>
                        </div>
                        <RadioGroup
                          defaultValue="option-one"
                          className="gap-4 flex"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="option-one"
                              id="option-one"
                            />
                            <Label htmlFor="option-one">Front Camera</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="option-two"
                              id="option-two"
                            />
                            <Label htmlFor="option-two">Back Camera</Label>
                          </div>
                        </RadioGroup>
                        <div className="grid gap-2">
                          <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="maxWidth">Camera</Label>
                            <Popover open={open} onOpenChange={setOpen}>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  aria-expanded={open}
                                  className="w-[200px] justify-between"
                                >
                                  {value
                                    ? cameraDevice.find(
                                        camera => camera.label === value
                                      )?.label
                                    : "Choose Camera ..."}
                                  <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-[200px] p-0">
                                <Command>
                                  <CommandInput placeholder="Search Camera..." />
                                  <CommandEmpty>
                                    No Camera Device found.
                                  </CommandEmpty>
                                  <CommandGroup>
                                    {cameraDevice.map(camera => (
                                      <CommandItem
                                        key={camera.id}
                                        value={camera.id}
                                        onSelect={currentValue => {
                                          setValue(
                                            currentValue === value
                                              ? ""
                                              : currentValue
                                          )
                                          setOpen(false)
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            value === camera.id
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                        {camera.label}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </Command>
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="height">Height</Label>
                            <Input
                              id="height"
                              defaultValue="25px"
                              className="col-span-2 h-8"
                            />
                          </div>
                          <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="maxHeight">Max. height</Label>
                            <Input
                              id="maxHeight"
                              defaultValue="none"
                              className="col-span-2 h-8"
                            />
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              {/* manual Input */}
              <div className="my-4 max-h-[150px] overflow-x-hidden overflow-y-auto flex items-center justify-between gap-4">
                <Accordion type="single" collapsible className="w-full ">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Manual Input</AccordionTrigger>
                    <AccordionContent>
                      {/* <p>Yes. It adheres to the WAI-ARIA design pattern.</p> */}
                      <div className=" px-2">
                        <div className="flex gap-2 pt-1">
                          <Input placeholder="Enter Id" id="manual" />
                          <Button>Submit</Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
            <div className="w-3/5 ">
              <CardTitle className="text-lg flex gap-2 items-center">
                Ready
                {/* <div className="bg-red-500 w-4 h-4 rounded-full animate-pulse"></div> */}
              </CardTitle>
              {/* SCANNED IMAGE */}
              <div className="bg-gray-400 h-auto w-full mt-2 mb-4 rounded-lg aspect-square"></div>
              <div className="flex flex-col text-sm items-center  gap-2">
                <h5 className="text-center w-full font-semibold text-lg pb-2">
                  John PonceDeleon
                </h5>

                <div className="w-full px-10 space-y-2">
                  <div className="flex justify-between ">
                    <h5>Strand</h5>
                    <h5 className="font-semibold">ICT</h5>
                  </div>
                  <div className="flex justify-between ">
                    <h5>Year Level</h5>
                    <h5 className="font-semibold">12</h5>
                  </div>
                  <div className="flex justify-between ">
                    <h5>Block</h5>
                    <h5 className="font-semibold">1</h5>
                  </div>
                </div>
              </div>
              {/* <Separator className="mt-6 mb-4" /> */}
              <div className="text-center">
                <h5>10:00 AM</h5>
                <h4 className="font-bold text-lg text-green-500">Logged In</h4>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}
