import { useNavigate } from "react-router-dom";


function FAQPage({buttonToMainMenuHandler}){
    const navigate = useNavigate();
    return(
    <div className="pl-4 flex flex-col bg-white border-2 border-solid border-gray-100 rounded-md">

   
        <h1 className="font-black text-3xl text-center my-4">FAQ</h1>
    
        <ol className="list-decimal ml-4 mr-4">

            <li>
                <span className="font-bold">What is MyVinylStats?.</span>
                <br/><br/>

                MyVinylStats is a website to keep track of how often you listen to your records!
                <br/>
                (Cassettes/CD's too. Any physical media really.)
                <br/><br/>
            </li>

            <li>
                <span className="font-bold">How does it work?</span>
                <br/><br/>

                <div className="bg-gray-300 pl-8 rounded-lg border-2 p-4">
                        In 3 steps.
                        <br/><br/>
                        <ol className="list-decimal pl-4">
                        <li>You connect to your Discogs account.</li>
                        <br/>
                        <li>We track all the albums in your Discogs collections.</li>
                        <br/>
                        <li>When you play a record, hit the play button (or scan the QR code) in <span className="underline font-bold" onClick={()=>navigate("/library")}>your library</span> to update your stats!</li>
                        <br/>
                        </ol>

                        That's it. We take care of the rest :)
                </div>
                <span className="font-bold"></span>
                <span className="font-bold"></span>
                <span className="font-bold"></span>

                <br/>
                
                
                
                <li>
                <span className="font-bold">QR Codes?</span>
                <br/><br/>

                
                We assign every album in your collection a QR code!
                <br/><br/>
                In <span className="underline font-bold" onClick={()=>navigate("/library")}>your library</span>
                &nbsp; you can print your QR codes and scan them with your phone to make tracking even easier.
                <br/><br/>

                I print mines as labels and stick them to my records :)
                <br/>
                

                <br/>
                </li>

                <li>
                <span className="font-bold">Why MyVinylStats?</span>
                <br/><br/>

                For a bunch of reasons, but the main ones:
                <br/><br/>
                <ul className="list-disc pl-8">
                    <li>There is no ethical streaming service.</li>
                    <br/>
                    <p className="pl-12 italic text-gray-500">All streaming services pay your favorite artists pennies on the dollar while big companies record massive profits.</p>
                    <br/>
                    <p className="pl-12 italic text-gray-500">Artists make most of their money on: <span className="text-bold">tours, merch, and <span className="font-black">PHYSICAL MUSIC sales.</span></span></p>
                </ul>
                <br/>

                <ul className="list-disc pl-8">
                    <li>America/The World is shifting towards a subscription based standard of living.</li>
                    <br/>
                    <p className="pl-12 italic text-gray-500">When I was a kid, when I paid for something, I OWNED IT. When your parents did, when their parents did, etc. Because that's how it should fucking work.</p>
                    <br/>
                    <p className="pl-12 italic text-gray-500">Most of the time, when you pay a digital item you are just paying for a <span className="font-bold">license</span> which can be <span className="font-black">REVOKED AT ANY FUCKING TIME.</span></p>
                    <br/>
                    <p className="pl-12 italic text-gray-500">I wanted to create something for people that like to keep track of their music habits, but want to get as offline as possible.
                        <br/><br/>
                        <span className="font-black">For people who want to subscribe less and own more.</span>
                    </p>
                    <br/>
                </ul>

                <ul className="list-disc pl-8">
                    <li>I'm pretentious. (And so are you.)</li>
                    <br/>
                    <p className="pl-12 italic text-gray-500">You get to show me your bootleg of <a className="underline" href = "https://www.discogs.com/release/9192115-Frank-Ocean-Blond">blond</a></p>
                    <br/>
                    <p className="pl-12 italic text-gray-500">I get to show you <a className = "underline" href = "https://www.discogs.com/artist/6516-My-Bloody-Valentine">cliche shoegaze bands</a>.</p>
                    <br/>
                    <p className="pl-12 italic text-gray-500">And neither of us have sex.</p>
                </ul>
                
                </li>
                <br/>

            </li>

            <div className="border-t-2 border-black mt-4">
            <p className="font-black text-center pt-2 mb-4">George Flores - December 2025</p>

            </div>
            
        </ol>
    </div>)
}

export default FAQPage;