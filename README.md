Delay.js
=================

> dead simple javascript execution delay library


##### Disclaimer

Highly inspired by [echo.js](https://github.com/toddmotto/echo) by Todd Motto.




# Example

```javascript
Delay.config({
  delay: 250 // 250ms
});

Delay.subscribe({
  element: document.getElementById('delay-until-in-view'),
  offset: 500,
  callback: function(){
    // ´this´ in this context refers to the element itself
    function rand(){ return Math.floor(Math.random()*255); };
    this.style.backgroundColor = "rgb("+rand()+","+rand()+","+rand()+")";
  },
  once: true, //fire the event only one time
})
```

_______________________



# API

Delay.


## .config

#### parameters

**options**/object

#### description

Global configuration for the Delay library. Valid option keys are: **delay**/Integer for now.





## .subscribe

#### parameters

**options**/Object

Valid options are **element**/Element, **callback**/Function, **offset**/Integer, **once**/Boolean(optional)


#### description

Registers a watcher on an Element and checks if this element is in view (meaning that its position on screen is inside the defined offset parameter).

Once the element is detected as in view, the callback function will be called.

The **once** parameter determines if the callback function should be fired only one time, or everytime the element is in view.

The **offset** parameter sets the desired offset to calculate wether the element is in view or not.

**Note**: in the callback function `this` will refer to the element itself.
