# ezCipher

## Demo & Examples

[http://www.ezramorse.com/js/ezCipher/demo/demo.html](http://www.ezramorse.com/js/ezCipher/demo/demo.html)

## Example Usage

### HTML

```html
<ul class="cipher">
	<li>
		<p class="title">First Slide</p>
		<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.</p>
		<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem</p>
	</li>
	<li>
		<p class="title">Second Slide</p>
		<p>Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por</p>
		<p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,</p>
		<p>Additional Paragraph</p>
	</li>
</ul>
```

### jQuery

Use the plugin as follows:

```js
// Initialize Cipher
var cipher = $('.cipher').ezCipher();

// Go to second slide
cipher.transition(1);
```

You can then bind the transitioning to button clicking events to navigate between slides

### CSS

The plugin automatically adds `class="ezCipherActive"` to the active list element. There is no style associated with this class.

To avoid issues, ensure the paragraphs from each slide have matching classes.

As a suggestion, the ciphered text should avoid using colorful markup, because the animated transition will strip all such tags out.

## Arguments
| Name | Default | Description |
| :--------------- | :-------------- | :-------------------------------------------------------- | 
| **activeClass**| 'ezCipherActive' | A class to assign the active list element |
| **steps**| 18 | The total number of steps in the animation. At each step, some characters have a change at changing |
| **innerSteps**| 4 | The number of times a single character should change over the course of the animation |
| **time**| 1.5 | Total time for the animation |
| **chars**| alphanumeric | A string containing all available characters to include in the transition animation |

## Installation

Include 'ezCipher.js' in your html file (preferably the footer)

## Notes

* Requires jQuery.
* Still in beta form. I just wrote for my site and will support if here is any interest.
* I have not tested htmlentities but they may be problematic
* Have fun

## License

This plugin is available under:
[the MIT license](http://mths.be/mit)
[The GPL license](http://www.gnu.org/copyleft/gpl.html)
