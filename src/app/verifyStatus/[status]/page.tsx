"use client";
import React from "react";
import { useParams } from "next/navigation";

const page = () => {
  const { status } = useParams();

  if (status === "success") {
    return (
      <div className="w-screen h-screen flex justify-center items-center text-xl text-green-400">
        Email Successfully Verified
      </div>
    );
  } else {
    <div className="w-screen h-screen flex justify-center items-center text-xl text-red-400">
      Email Already Verified
    </div>;
  }
};

export default page;
