#Image Upload
A backend project for uploading an image developed using NodeJS , ExpressJS, MongoDb.
##INSTALLATION
Clone or download the app and then run the following command to host the app locally.

```bash
npm install
```

Now all the dependencide are installed.To start the application run the following command

```bash
npm start
```

##About the Project
To upload Images I have used a library called multer.
I have created a photo model with attributes of imageName,photoURL(URL link to the photo),multerImageName(the name of image as saved in multer),resizedImages array(To store the URLs of resized images with their height and width).
##Image Upload API
Allowed image formats are .png,jpeg,jpg,.gif;
![Alt text](/Readme ScreenShots/Allowed Image Formats.png?raw=true "Optional Title")
Multer using disk storage will store the image in the public/upload path. Multer her is naming the image acoording to timestamp. So images with same names can be uploaded/same images with different names.
A new photo model element is created and its saved into the database with its URL, Image name provided in the params and multer Image name.
##List Images
Looping through the photo collection of database and sending Id attribute if each image.
##Get image when image id is provided and resize it according to height and width dimensions provided in the params.
Using findbyId the image data is known, if no image exists with such Id returns error.
Once the imageId collcted,the resizedImages array is checked, if there is already a resized Image URL with the given height and width in the params, if it is present that URL is sended a response.
If it isnt present we access the the image file using its multer image name.
Along with path,height and width are sent to the resize function as arguments.
Resize function is using a library called node-image-resizer. This is creates a new image with the Image name as orignal name prefixed with the height and width in the public/upload folder.
Now this resized Image URL is pushed into resizedImages array of the data along with its height and width and it is saved.Then the resized Image URL is returned.
