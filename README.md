# Frontspace
Frontspace is a modern minimal css framework that aims to provide an extensible baseline for building complex web applications.

## Installation
You can install the default build of frontspace using unpkg:<br>
This includes all the normalization, properties and classes from all modules documented below.
```html
<link rel="stylesheet" href="https://unpkg.com/frontspace">
```
Or use the npm package and build your custom version using [sass](https://sass-lang.com/):
```shell
npm i -D frontspace
```
```scss
@use "~frontspace/sass/modules/...";
```

<br>



# Layout
```scss
@use "~frontspace/sass/modules/layout";
```

## Padding
The padding system allows to configure visual padding while not beeing affected by borders.<br>
None of the padding properties are inherited.
```scss
:root {
    // Define padding values "btn":
    // You can specify 1, 2, 3 or 4 values just like with the regular "padding" property.
    @include layout.define-padding(btn, .7rem, 1rem);
}

.btn {
    // Apply the padding values that are used for this element:
    // (This is the same as adding the ".padding" class to an element)
    @include layout.padding;

    // Use the padding values "btn" from the theme:
    @include layout.use-padding(btn);
    // Or specify values directly:
    @include layout.set-padding(.7rem, 1rem);
}
```
When adding borders to a control, you should set the border properties:
```scss
.btn {
    border: 2px solid black;
    @include layout.set-border-width(2px);
    // (You can specify up to alues just like with padding)
}
```

## Spacing & Flexbox Containers
The spacing system allows adding space between and around elements based on the element types and the context they are beeing used in. For instance, you want space above an `h1` element in a document context, but not in a navbar.

### Row/column Space
```scss
:root {
    // Define the spacing between rows on a "page":
    @include layout.define-row-space(page, 1rem);
    // Define the spacing between columns in a "navbar":
    @include layout.define-column-space(navbar, .8rem);
}

.page {
    // Make this element a flex row:
    @include layout.row;
    // Apply the row spacing values between child elements:
    @include layout.row-space;

    // Use the row spacing values "page" from the theme:
    @include layout.use-row-space(page);
    // Or specify values directly:
    @include layout.set-row-space(1rem);
}

.navbar {
    // Make this element a flex column:
    @include layout.column;
    // Apply the column spacing values between child elements:
    @include layout.column-space;

    // Use the column spacing values "navbar" from the theme:
    @include layout.use-column-space(navbar);
    // Or specify values directly:
    @include layout.set-column-space(.8rem);
}
```

### Flow Space
If you want to allow elements in a flex box to wrap, you can use `flow-space` to enable flex wrapping and add even space between rows and columns. However this has some caveats:
+ You should never style the container element in any way that makes it's bounding box visible.
+ Element defined spacing is disabled, but you can arbitrarily nest flow space containers with different spacing properties to achieve similar results.

```scss
.items {
    @include layout.row;
    @include layout.use-column-space(items);
    @include layout.use-row-space(items);

    // This is a replacement for row-space/column-space mixins:
    @include layout.flow-space;
}

// If you need to add a border or background to the container element,
// use an additional wrapper element instead:
.items-border {
    border: 1px solid black;
}
```
```html
<div class="item-border">
    <div class="items">
        <div>Foo</div>
        <div>Bar</div>
        ...
    </div>
</div>
```

### Individual Space
For special elements like headings, you want to specify individual space that is automatically applied if they are used directly inside a container that uses `row/column-space`. Individual space is not applied if no element is on that side of an element.
```scss
:root {
    // Define individual spacing values "h1":
    @include layout.define-space-around(h1, $top: 6rem);
}

h1 {
    // Use "h1" as the individual space for this element:
    @include layout.use-space-around(h1);
    // Or specify values directly:
    @include layout.set-space-around($top: 6rem);
}
```
```html
<div class="column row-space">
    <!--
        Individual space is not applied when no element is next
        to it, so the following h1 element has no space above:
    -->
    <h1>Foo</h1>
    <div>Some content...</div>
    <!--
        The following h1 element will have 6rem space above it
        in addition to the row space:
    -->
    <h1>Bar</h1>
    <div>Some content...</div>
</div>
```

### Line Layout
Displaying a text block beside something else that should be vertically aligned can be a pain as the line height of text adds small spacing to the top and bottom of any text. To avoid all of these problems frontspace provides a special container for all text fragments or other inline elements:
```scss
:root {
    // Line layout properties are inherited, so you can set the
    // defaults in your theme directly.
    @include layout.set-line-layout(
        $space: .5em,
        $offset-top: 0em,
        $offset-bottom: 0em
    );

    // Or define named properties:
    @include layout.define-line-layout(code, $space: .4em);
}

p {
    @include layout.text;
}

code {
    @include layout.text;
    @include layout.use-line-layout(code);
}
```

### Normalization
Normalization should be always included unless you know what you are doing:
```scss
@include layout.normalize;
```
+ Sets line-height to 1 on the root element to avoid inexpected padding.
+ Sets the following properties on all elements:
    + `box-sizing: border-box`
    + `vertical-align: top`

### Properties
The properties mixin defines some default properties like the line layout and
prevents inheritance of spacing and other layout properties that should be explicitly
defined for every element.
```scss
@include layout.props;
```

### Standard Classes
Adds the following classes that correspond to the mixins with the same name:
+ `.margin`
+ `.padding`
+ `.row`
+ `.column`
+ `.row-space`
+ `.column-space`
+ `.flow-space`
+ `.grow`
+ `.text`

```scss
@include layout.classes;
```

<br>



## Default Build
The default build includes the following things
```scss
@include layout.normalize;
@include layout.props;
@include layout.classes;
```
and is available in the npm package under `/css/default.css` or via unpkg:
```html
<link rel="stylesheet" href="https://unpkg.com/frontspace">
```
