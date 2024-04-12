import { useEffect, useState, useContext } from 'react';
import Homepage from './components/Authentication/Homepage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HorizontalNav from './components/Navigation/HorizontalNav';
import { AuthContext } from '../server/middleware/setAuth';
import HeroSection from './components/HeroSection/HeroSection';
import LogoHeader from './components/Header/logoHeader';

export default function Root() {
  const [businessList, setBusinessList] = useState([]);
  const { auth } = useContext(AuthContext);

  const addBusiness = (newBusiness) => {
    setBusinessList([...businessList, newBusiness]);
  };

  useEffect(() => {
    const saveBusinessList = async () => {
      const jsonString = JSON.stringify(businessList);
      const response = await fetch('src/data/businessList.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonString,
      });
      if (!response.ok) {
        console.error('Error saving business list:', response.statusText);
      }
    };

    saveBusinessList();
  }, [businessList]);

  return (
    <>
      <Header />
      {auth.token ? <HorizontalNav /> : null}
      <HeroSection />
      <LogoHeader />
      <div
        className="flex flex-col sm:flex-row"
        style={{ backgroundColor: '#0B4A8F' }}
      >
        <div
          id="main"
          className="main-content w-1/2"
          style={{
            marginTop: '40px',
            marginBottom: '40px',
            marginLeft: '60px',
            marginRight: '60px',
            color: '#FFFFFF',
          }}
        >
          <h1 className="text-4xl sm:text-3xl md:text-2xl lg:text-xl">
            We’re Looking for Businesses to Benefit from FREE Work!
          </h1>
          <h2 className="text-4xl sm:text-3xl md:text-2xl lg:text-xl">
            A Capstone Program
          </h2>
          <br></br>
          <p>
            <h2>
              Do you have a challenge in your organization that is going
              unsolved?
            </h2>
          </p>
          <p>
            <h2>
              Could you use a team of talented developers or designers to
              partner with you to create a solution in an effective and
              collaborative way? A team of software developers or user
              experience design students from Front Range Community College can
              work together with you to build a prototype, proof of concept,
              design map, or minimum viable product to solve your needs.
            </h2>
          </p>{' '}
          <p>
            <h2>
              The Benefit to YOU is simple.
              <br></br>
              <br></br>
              For the cost of some of your time, you can have a complete
              Software, UX/UI, Data Analytics, or Digital Marketing project
              completed for FREE! The value in service and labor equates to
              between $9,000 and $12,000!
            </h2>
          </p>{' '}
          <p>
            <h2>
              What is a Capstone? Front Range Community College and Upright is a
              learning organization that teaches students the skills they need
              to transition into a technology-focused career. We have been
              partnering with organizations like yours since 2018 to deliver
              software and design solutions within an educational setting.
              Projects like yours are the final part of a 12-week boot camp
              curriculum and serve as the crowning achievement for student
              groups who are graduating from our program. We call this
              opportunity our student capstone project.
            </h2>{' '}
          </p>
          <p>
            <h2>
              Capstone Project Overview Student teams work with real clients,
              such as yourself, to create either functioning software or user
              experience design assets that they present in a public
              demonstration. The student teams take projects from ideation to a
              functioning state over four to eight weeks, depending on the
              program. As a project sponsor, you would collaborate with a
              dedicated team of creators, and be free to use the source code or
              design assets after the project concludes.
            </h2>
          </p>
        </div>
        <div
          className="card bg-white shadow-md rounded-lg p-4 m-2 mb-4"
          style={{
            marginRight: '80px',
            marginTop: '30px',
            marginLeft: '80px',
          }}
        >
          <Homepage />
        </div>
      </div>
      <Footer />
    </>
  );
}
