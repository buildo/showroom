# **BUTTON**

[Mockup →](https://zpl.io/Z1jerU)

----------

A button indicates a possible user action. The style of the button is related to the relative importance of the action. The text describes clearly the action.

This is the default button style:

![](https://d2mxuefqeaa7sj.cloudfront.net/s_CF48C0020050FD428C646D75C84D89C6B86C30D9092D23A678E68D89D46D7873_1473072281552_file.png)



    height:36px;
    background:$gradientGrey;
    border:solid 1px $silver;
    border-radius:4px;
    padding:0px 18px;
    cursor:pointer;
    color:$darkGrey;
    font-family:SourceSansPro;
    font-size:14px;
    font-weight:semibold;

**NB:** Even if vertical padding is `0px` the text is centered vertically. You may use the tag `button`  which centers text by default


## **TYPES OF BUTTONS AND THEIR USE**
----------

A button can be formatted to show different levels of emphasis. We have 5 types of buttons.

### **Default Button**

Default buttons are the default choice to use for most generic actions.

![](https://d2mxuefqeaa7sj.cloudfront.net/s_CF48C0020050FD428C646D75C84D89C6B86C30D9092D23A678E68D89D46D7873_1473072545650_file.png)

### **Primary Button**

Primary buttons  are used to indicate the primary action on a page. They are a “call to action”, which means that they attract the attention of the user. There should be a small number of primary buttons on the same page, preferably only 1 primary button visible at the same time.
These are the differences with respect to the default button:

![](https://d2mxuefqeaa7sj.cloudfront.net/s_CF48C0020050FD428C646D75C84D89C6B86C30D9092D23A678E68D89D46D7873_1473072568137_file.png)



    background:$gradientAzure;
    border:solid 1px $waterBlue;
    color:$white;


### **Flat Button**

Flat buttons are similar to default buttons in their use, and the choice is based on UI style. In particular, flat buttons are recommended when multiple actions are present in the same UI area, such as in a list with actions associated to each row.

The special characteristic of flat buttons is that they look just like link, but when the user hovers over a flat button the style changes and becomes a complete button.

![](https://d2mxuefqeaa7sj.cloudfront.net/s_CF48C0020050FD428C646D75C84D89C6B86C30D9092D23A678E68D89D46D7873_1473072667970_file.png)


These are the differences with respect to the default button:


    background: none;
    color: $darkGrey;


### **Positive** **Button**

Positive buttons are used to indicate a positive action, or confirmation of successful action (as explained below )

![](https://d2mxuefqeaa7sj.cloudfront.net/s_CF48C0020050FD428C646D75C84D89C6B86C30D9092D23A678E68D89D46D7873_1473072729351_file.png)


These are the differences with respect to the default button:


    background: $gradientGreen;
    border: solid 1px $seaGreen;
    color: $white;


### **Negative Button**

Negative buttons are used to indicate a potentially dangerous action. They are often referred to as destructive buttons.

![](https://d2mxuefqeaa7sj.cloudfront.net/s_CF48C0020050FD428C646D75C84D89C6B86C30D9092D23A678E68D89D46D7873_1473072828527_file.png)


These are the differences with respect to the default button:


    background: $gradientRed;
    border: 1px solid $alizarinCrimson;
    color: $white;
## **UI STATES**
----------

We support the following UI states:

- **normal** no interaction by user, button is enabled and can be clicked
- **hover** user is hovering over, button is enabled and can be clicked
- **disabled** independently of user interaction, button is disabled and cannot be clicked; there is no hover state
### **Hover**

**D****efault Button**
The default button, when hovering, changes the background gradient

![](https://d2mxuefqeaa7sj.cloudfront.net/s_CF48C0020050FD428C646D75C84D89C6B86C30D9092D23A678E68D89D46D7873_1473073325874_file.png)


These are the differences with respect to the default button in normal state:


    background: $gradientDarkGrey;

**Primary, Positive and Negative buttons**
Similar styles are applied to primary, positive and negative buttons.


These are the differences with respect to the Primary button in normal state:

![](https://d2mxuefqeaa7sj.cloudfront.net/s_CF48C0020050FD428C646D75C84D89C6B86C30D9092D23A678E68D89D46D7873_1473073338885_file.png)

    background: $gradientDarkAzure;


These are the differences with respect to the Positive button in normal state:

![](https://d2mxuefqeaa7sj.cloudfront.net/s_CF48C0020050FD428C646D75C84D89C6B86C30D9092D23A678E68D89D46D7873_1473073350894_file.png)

    background: $gradientDarkGreen


These are the differences with respect to the Negative button in normal state:

![](https://d2mxuefqeaa7sj.cloudfront.net/s_CF48C0020050FD428C646D75C84D89C6B86C30D9092D23A678E68D89D46D7873_1473073364870_file.png)

    background: $gradientDarkRed;




### **Flat Button**

When hovering, flat buttons only add a border and changes the text color. There is no gradient.

These are the differences with respect to the flat button in normal state:

![](https://d2mxuefqeaa7sj.cloudfront.net/s_CF48C0020050FD428C646D75C84D89C6B86C30D9092D23A678E68D89D46D7873_1473073418571_file.png)

    border: solid 1px $darkGrey;


### **Disabled**

All 5 types of buttons (Normal, Primary, Positive, Negative, Flat) behave the same way in the **disabled** state: they reduce the `opacity` .

![](https://d2mxuefqeaa7sj.cloudfront.net/s_CF48C0020050FD428C646D75C84D89C6B86C30D9092D23A678E68D89D46D7873_1473073459653_file.png)


These are the differences with respect to the normal, primary, positive, negative and flat buttons in normal state:


    opacity:0.5;

**Important**: The same style is applied to primary, positive, negative and flat buttons

##
## **SPECIAL VARIANTS**
----------
### **Fluid Button**

This variant can be applied to default, primary, positive and negative buttons. It cannot be applied to flat buttons.

Block buttons typically occupy all the horizontal space available in its container. There should be only 1 button on the same line, if more than one block button is present they are stacked vertically.

There can be other UI components on the same line under special circumstances, based on design needs, but typically they are alone.

![](https://d2mxuefqeaa7sj.cloudfront.net/s_CF48C0020050FD428C646D75C84D89C6B86C30D9092D23A678E68D89D46D7873_1473073476412_file.png)

    display: block;
    width: 100%;



### **Icon Text Button**

This variant can be applied to all buttons.

![](https://d2mxuefqeaa7sj.cloudfront.net/s_CF48C0020050FD428C646D75C84D89C6B86C30D9092D23A678E68D89D46D7873_1473073499133_file.png)


Icons must have the same font-size and color of the button text. They should also have a small right margin:


    .icon {
      margin-right: 4px;
    }

**Important**: if the icon size seems wrong, it should not be changed but the original icon should be fixed.



### **Async Button**

This variant can be applied to default, primary, positive and flat buttons. It cannot be applied to negative buttons, icon buttons,


- **Ready**
![](https://d2mxuefqeaa7sj.cloudfront.net/s_CF48C0020050FD428C646D75C84D89C6B86C30D9092D23A678E68D89D46D7873_1473073562185_file.png)





- **Loading**


![](https://d2mxuefqeaa7sj.cloudfront.net/s_CF48C0020050FD428C646D75C84D89C6B86C30D9092D23A678E68D89D46D7873_1473073579059_file.png)





- **Success**
![](https://d2mxuefqeaa7sj.cloudfront.net/s_CF48C0020050FD428C646D75C84D89C6B86C30D9092D23A678E68D89D46D7873_1473073591150_file.png)




- **Error**
![](https://d2mxuefqeaa7sj.cloudfront.net/s_CF48C0020050FD428C646D75C84D89C6B86C30D9092D23A678E68D89D46D7873_1473073600447_file.png)




## **BUTTON** **SIZE****S**
----------

 There are 3 possible button sizes:


- **Tiny** ****a smaller button size, typically used for space constrained areas such as panel header
![](https://d2mxuefqeaa7sj.cloudfront.net/s_CF48C0020050FD428C646D75C84D89C6B86C30D9092D23A678E68D89D46D7873_1473073813229_file.png)

    height: 32px;
    padding-left: 16px;
    padding-right: 16px;


- **Small** ****the default button size
![](https://d2mxuefqeaa7sj.cloudfront.net/s_CF48C0020050FD428C646D75C84D89C6B86C30D9092D23A678E68D89D46D7873_1473073823655_file.png)

- **Medium**
![](https://d2mxuefqeaa7sj.cloudfront.net/s_CF48C0020050FD428C646D75C84D89C6B86C30D9092D23A678E68D89D46D7873_1473073833968_file.png)

    height: 44px;
    font-size: 16px;


## **DISTANCE BETWEEN TWO BUTTONS**
----------

Distance between two buttons: **12px**

![](https://d2mxuefqeaa7sj.cloudfront.net/s_CF48C0020050FD428C646D75C84D89C6B86C30D9092D23A678E68D89D46D7873_1473087028091_file.png)


