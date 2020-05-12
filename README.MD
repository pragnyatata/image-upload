# Image Upload

A backend project for uploading an image developed using NodeJS, ExpressJS, MongoDB.

## INSTALLATION

Clone or download the app and then run the following command to host the app locally.

```bash
npm install
```

Now all the dependencies are installed. To start the application run the following command

```bash
npm start
```

## Mongoose Model

To upload images I have used a library called multer.
I have created a photo model with attributes

- imageName
- photo URL(URL link to the photo)
- multerImageName(the name of the image as saved in multer)
- resizedImages array(To store the URLs of resized images with their height and width).

## Image Upload API

Allowed image formats are .png, jpeg,jpg,.gif.

<img src="Readme%20ScreenShots/allowedImageFormats.png" width="800" height="400">

We can see that .jiff format cannot be upload. Any other file also cant be uploaded.
Multer using the disk storage will store the image in the public/upload path. Multer here is naming the image according to timestamp. So images with the same names can be uploaded/same images with different names.
A new photo model element is created and it's saved into the database with its URL, Image name provided in the params, and multerImage name.

<img src="Readme%20ScreenShots/imageUpload.png" width="800" height="400">

## List Images

Looping through the photo collection of database and sending Id attribute if each image.
<img src="Readme%20ScreenShots/imagesList.png" width="800" height="400">

## Get image when image id is provided and resize it according to height and width dimensions provided in the params.

Using findbyId the image data is known, if no image exists with such Id returns error.
<br/>
Once the imageId collected, the resizedImages array is checked, if there is already a resized Image URL with the given height and width in the params. If it is present that URL is sent a response.
<br/>
If it isn't present we access the image file using its multerImage name.
Along with path, height and width are sent to the resize function as arguments.
Resize function is using a library called node-image-resizer. This creates a new image with the Image name as original name prefixed with the height and width in the public/upload folder.
Now this resized Image URL is pushed into resizedImages array of the data along with its height and width and it is saved. Then the resized Image URL is returned.
<br/>
The first id from the images list is called with 100 x 100 dimesnions.

<img src="Readme%20ScreenShots/dimensions100_100.png" width="800" height="400">

Here is the image from the url returned in the previous screenshot.

<img src="Readme%20ScreenShots/100100.png" width="800" height="400">

Similarly same image with 300 x 300 dimensions.

<img src="Readme%20ScreenShots/300300.png" width="800" height="400">

The resizedImages array contains two types of resized images.

<img src="Readme%20ScreenShots/Mongodb_Imagtree.png" width="800" height="400">
