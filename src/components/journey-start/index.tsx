'use client';
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const JourneyStart = () => {
  return (
    <section className="flex flex-col gap-6 mx-auto max-w-[500px]">
      <Link href="/find-my-plate" className="flex-1">
          <Card className="bg-foreground text-background w-full">
            <CardHeader>
              <h2>Find my plate</h2>
            </CardHeader>
            <CardBody>
              <p className="text-sm">
                Been in an accident and think someone may be able to help?
              </p>
            </CardBody>
          </Card>
      </Link>
      <Link href="/submit-details" className="flex-1">
        <Card className="bg-foreground text-background w-full">
          <CardHeader>
            <h2>Submit plate details</h2>
          </CardHeader>
          <CardBody>
            <p className="text-sm">
              Witnessed an accident and want to pass on details to the victim?
            </p>
          </CardBody>
        </Card>
      </Link>
    </section>
  );
};

export default JourneyStart;
