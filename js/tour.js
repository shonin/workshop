import { Tour } from "flock";

console.log("hello");

const tour = new Tour({
    defaults: {
        classes: "hello-world"
    }
});

tour.addStep("1", {
    text: "helloooo"
});

tour.start();
