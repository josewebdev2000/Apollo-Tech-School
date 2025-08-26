/** Component that represents the about webpage */

import AboutHero from "../../components/About/AboutHero/AboutHero";
import AboutFeaturedCard from "../../components/About/AboutFeaturesCard/AboutFeatureCard";
import AboutFeaturedCardContainer from "../../components/About/AboutFeaturedCardContainer/AboutFeaturedCardContainer";
import AboutSummaryCardsContainer from "../../components/About/AboutSummaryCardsContainer/AboutSummaryCardsContainer";
import AboutTestimonialCard from "../../components/About/AboutTestimonialCard/AboutTestimonialCard";
import AboutTestimonialsContainer from "../../components/About/AboutTestimonailsContainer/AboutTestimonialsContainer";
import AboutSummaryCard from "../../components/About/AboutSummaryCard/AboutSummaryCard";

function About()
{
    return (
        <div className="bg-gray-900 text-white font-poppins">
            <AboutHero
                title={"Unleash your passion for the Information Technology Industry!"}
                subtitle={"At Apollo Tech School, we know you're bored of the traditional classroom. So here you'll learn by solving practical problems right away."}
                linkHref={"/"}
                linkText={"Browse Our Content"}
            />

            {/**Summary Cards */}
            <AboutSummaryCardsContainer>
                <AboutSummaryCard
                    faIconName={"faChalkboardTeacher"}
                    title={"Expertise Guaranteed"}
                    content={"Our instructors are not only expters in their fields. THey are also experts at teaching you."}
                />
                <AboutSummaryCard
                    faIconName={"faClock"}
                    title={"Flexible Schedule"}
                    content={"We know life gets busy. So we made it so you can access your courses at any time 24/7."}
                />
                <AboutSummaryCard
                    faIconName={"faCertificate"}
                    title={"Certifications"}
                    content={"Celebrate your newly acquired skills with our certifications and show the world you're the real deal."}
                />
                <AboutSummaryCard
                    faIconName={"faTools"}
                    title={"Real-World Projects"}
                    content={"You'll learn by doing to tackle the complex challenges that belong to the IT industry"}
                />
            </AboutSummaryCardsContainer>

            {/** Featured Cards Section */}
            <AboutFeaturedCardContainer>
                <AboutFeaturedCard
                    title={"Beginner Friendly"}
                    content={"We'll take your hand and guide you through examples and exercises so you go from zero-to-hero."}
                />
                <AboutFeaturedCard
                    title={"Lifetime Access"}
                    content={"Once you buy one of our courses, it's yours forever. If you subscribe to a membership later on and cancel it you won't lose it."}
                />
                <AboutFeaturedCard
                    title={"Career Guidance"}
                    content={"Our Course Packets and Learning Paths guide you to what you need to learn to become a certain IT professional."}
                />
                <AboutFeaturedCard
                    title={"Up-to-Date Content"}
                    content={"Since the IT industry is constantly changing. We're always updating our content so you stay up-to-date."}
                />
            </AboutFeaturedCardContainer>

            {/** Testimonial Cards */}
            <AboutTestimonialsContainer>
                <AboutTestimonialCard
                    userRating={"5.0"}
                    studentName={"Ben Charleson"}
                    studentCareer={"Systems Programmer"}
                    studentPicSrc={"https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                    studentReview={'"I wish I had started to learn about IT here sooner."'}
                />
                <AboutTestimonialCard
                    userRating={"4.5"}
                    studentName={"Jose Garcia"}
                    studentCareer={"Android Developer"}
                    studentPicSrc={"https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                    studentReview={'"I now know how to build Android apps in Java and Kotlin thanks to this platform."'}
                />
                <AboutTestimonialCard
                    userRating={"4.7"}
                    studentName={"Juan Gabriel"}
                    studentCareer={"Data Analyst"}
                    studentPicSrc={"https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                    studentReview={'"There is no other platform that allows me to upgrade my skills like this."'}
                />
            </AboutTestimonialsContainer>

            {/** Last About Hero */}
            <AboutHero
                title={"Ready to Start Your Tech Journey?"}
                linkText={"Join Us Today"}
                linkHref={"/register"}
            />
        </div>
    );
}

export default About;