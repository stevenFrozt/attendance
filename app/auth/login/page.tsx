"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { QrScanner } from "@yudiel/react-qr-scanner"

export default function Page() {
  const [data, setData] = useState("")
  return (
    <div className="min-h-[100vh] bg-red-500 flex ">
      <div className="w-full min-h-full bg-[url('https://images.pexels.com/photos/5427648/pexels-photo-5427648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')]">
        {/* <div className="grid place-items-center h-80 bg-white w-2/5">
          <div className="w-80 h-80 overflow-hidden rounded-xl bg-white p-4">
            <QrScanner
              onDecode={result => setData(result)}
              onError={error => console.log(error?.message)}
            />
          </div>
          <h1>{data}</h1>
        </div> */}
      </div>
      <div className="w-[40%] bg-white ">
        {/* CONTENT */}
        <div className="pt-20 ">
          {/* LOGO */}
          <div className="mt-10 mb-20">
            <h1 className="text-center font-bold text-2xl">YOUR LOGO HERE</h1>
          </div>
          <form action="" className="w-4/5 mx-auto ">
            <div className="space-y-6">
              <div>
                <Input type="email" placeholder="Account ID" />
                <p className="text-sm py-1 pl-2 text-red-500 font-medium">
                  Lorem ipsum dolor sit.
                </p>
              </div>
              <div>
                <Input type="email" placeholder="Password" />
                <p className="text-sm py-1 pl-2 text-red-500 font-medium">
                  Lorem ipsum dolor sit.
                </p>
              </div>
              <Button className="w-full">Submit</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
