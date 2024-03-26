import { useEffect, useState } from "react";
import Homepage from "../components/Authentication/Homepage";

export default function Root() {
  const [businessList, setBusinessList] = useState([]);

  const addBusiness = (newBusiness) => {
    setBusinessList([...businessList, newBusiness]);
  };

  useEffect(() => {
    const saveBusinessList = async () => {
      const jsonString = JSON.stringify(businessList);
      const response = await fetch("src/data/businessList.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonString,
      });
      if (!response.ok) {
        console.error("Error saving business list:", response.statusText);
      }
    };

    saveBusinessList();
  }, [businessList]);

  return (
    <div id="main" className="main-content">
      <h1 className="text-xl">
        We’re Looking for Businesses to Benefit from FREE Work!{" "}
      </h1>
      <p className="text-xl">A Capstone Program </p>
      <p>
        Do you have a challenge in your organization that is going unsolved?
      </p>
      <p>
        Could you use a team of talented developers or designers to partner with
        you to create a solution in an effective and collaborative way? A team
        of software development or user experience design students from Front
        Range Community College can work together with you to build a prototype,
        proof of concept, design map, or minimum viable product to solve your
        needs.
      </p>{" "}
      <p>
        The Benefit to YOU is simple For the cost of some of your time, you can
        have a complete Software, UX/UI, Data Analytics, or Digital Marketing
        project completed for FREE! The value in service and labor equates to
        between $9,000 and $12,000!
      </p>{" "}
      <p>
        What is a Capstone? Front Range Community College and Upright is a
        learning organization that teaches students the skills they need to
        transition into a technology-focused career. We have been partnering
        with organizations like yours since 2018 to deliver software and design
        solutions within an educational setting. Projects like yours are the
        final part of a 12-week boot camp curriculum and serve as the crowning
        achievement for student groups who are graduating from our program. We
        call this opportunity our student capstone project.{" "}
      </p>
      <p>
        Capstone Project Overview Student teams work with real clients, such as
        yourself, to create either functioning software or user experience
        design assets that they present in a public demonstration. The student
        teams take projects from ideation to a functioning state over four to
        eight weeks, depending on the program. As a project sponsor, you would
        collaborate with a dedicated team of creators, and be free to use the
        source code or design assets after the project concludes.
      </p>
      <div className="flex w-full">
        <Homepage />
      </div>
    </div>
  );
}
