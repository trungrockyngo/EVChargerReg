# Back End
<h2> Setting up the backend </h2>
<hr>
The backend is an express server that connects to the blockchain through the fabric sdk and exposes api endpoints 
that enables transactions and queries from users utilizing the front end to be executed on the network.

<h2> Steps </h2>
<ol>
    <li> <strong> Install dependencies: </strong>  Navigate to the root of the backend directory and
Run <strong> npm install  </strong>to get the required dependencies. You can open the package.json file to see the 
required packages 
    </li>
    <li> Navigate to <strong> http://localhost:8000 </strong>  on your browser and you should see the express server welcome page <br>
    <em> Note: If you change the port on which the backend server is running,
    you will also have to update that on the frontend/src/components everywhere calls are made to endpoints through axios library.</em>
    </li>
</ol>

![alt text](./public/images/backend.png?raw=true) <br>

<p>In our frontend EV Charger System scenario, 
we will have 3 users representing the three participants in the business network:</p>
<ul>
    <li> Devices</li>
    <li> Controller </li>
    <li> Super Admin </li>
</ul>

<h2> TO DO:</h2>
<hr>
<ul>
    <li> Multi-user support with JWT Authentication </li>
</ul>
<hr>