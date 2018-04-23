## MarkupTags ##

### What is MarkupTags? ###

MarkupTags is a very lightweight Javascript library to have a simple HTML tag for the selected content of form elements like Textarea, Input. It is fairly straight-forward and easy to use.

### Requirement ###

* Jquery Library
* MarkupTags Javascript (find in src/)
* RangyInput Javascript (find in src/)

### Usage ###

It's very simple to use. Just create an MarkupTags object passing the required element's class or id, as shown below.

**Example**

![Demo1 - Textarea](https://raw.githubusercontent.com/karthikm19/markuptags/master/assets/demo1.png)

Create a textarea with class "markup-tags-demo-1"

    <textarea class="markup-tags-demo-1"><strong>Lorem Ipsum/strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</textarea>

Create an object MarkupTags with the class name.

    <script>
        !function ($) {
            new MarkupTags($(".markup-tags-demo-1"));
        }(window.jQuery);
    </script>

---

**Example**

![Demo1 - Textarea](https://raw.githubusercontent.com/karthikm19/markuptags/master/assets/demo2.png)

Create a textbox with class "markup-tags-demo-2"

    <input type="text" class="markup-tags-demo-2" value="Lorem Ipsum is simply dummy text"/>

Create an object MarkupTags with the class name.

    <script>
        !function ($) {
            new MarkupTags($(".markup-tags-demo-2"));
        }(window.jQuery);
    </script>

### Credits ###
MarkupTags library uses the below:

1. [RangyInputs](https://github.com/timdown/rangyinputs) by [Tim Down](https://github.com/timdown)
