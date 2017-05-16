import path from "path";
import fs from "fs-promise";
import chai from "chai";
import chaiFs from "chai-fs";
import faker from "faker";
import {
	getUserImagePath,
	writeUserImageToDisk,
	deleteUserImageFromDisk,
	addImage
} from "../../server/api/services/userImages";
import {getFileNameWithNoExtension, deleteFile} from "../../utils/utils";

chai.use(chaiFs);
chai.should();

const PLACEHOLDER_IMAGE = getUserImagePath("default");

const deleteUserImage = path => deleteFile(path, () => path !== PLACEHOLDER_IMAGE);

const clearImages = () =>
	fs.readdir(path.join(process.env.IMAGESDIR, "users"))
		.then(files => files.map(file => getUserImagePath(getFileNameWithNoExtension(file))))
		.then(filePaths =>
			filePaths.length
				? Promise.all(filePaths.map(deleteUserImage))
				: Promise.resolve(true));

describe("user image services", function () {
	describe("writeUserImageToDisk", function () {
		afterEach(function () {
			return clearImages();
		});

		it("should write an image to disk", function () {
			const image = {
				id:   faker.random.uuid(),
				data: `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAeAB4AAD/2wBDAAcFBQYFBAcGBQYIBwcIChE
			LCgkJChUPEAwRGBUaGRgVGBcbHichGx0lHRcYIi4iJSgpKywrGiAvMy8qMicqKyr/2wBDAQcICAoJCh
			QLCxQqHBgcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKir/w
			AARCAAXAB0DASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAUBAwQG/8QAIxAAAQMFAAICAwAA
			AAAAAAAAAQACEQMEEiExQVETImGRof/EABgBAAMBAQAAAAAAAAAAAAAAAAIDBgEF/8QAHREAAgICAwE
			AAAAAAAAAAAAAAAECAwQRBRJRQf/aAAwDAQACEQMRAD8AQNP7mIVr3wzsQFly+pJaOQ3flUV7ks1Oz0
			KZS2ccLq4AbA9SYS+pfMJGR/qmvXIBLRr17SmrlUdJdj+I4nxrTB6nW4yMna1KxXtOSXP5HR4QhJRov
			rAfIcSYIiUnurksuXMDSIjYPUIVLweLTlXyhdHaUd/fV4Gf/9k=`
			};

			writeUserImageToDisk(image)
				.then(() => getUserImagePath(image.id).should.be.a.file)
		});
	});

	describe("deleteUserImageFromDisk", function () {
		afterEach(function () {
			return clearImages();
		});

		it("should delete an image from disk", function () {
			const image = {
				id:   faker.random.uuid(),
				data: `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAeAB4AAD/2wBDAAcFBQYFBAcGBQYIBwcIChE
			LCgkJChUPEAwRGBUaGRgVGBcbHichGx0lHRcYIi4iJSgpKywrGiAvMy8qMicqKyr/2wBDAQcICAoJCh
			QLCxQqHBgcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKir/w
			AARCAAXAB0DASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAUBAwQG/8QAIxAAAQMFAAICAwAA
			AAAAAAAAAQACEQMEEiExQVETImGRof/EABgBAAMBAQAAAAAAAAAAAAAAAAIDBgEF/8QAHREAAgICAwE
			AAAAAAAAAAAAAAAECAwQRBRJRQf/aAAwDAQACEQMRAD8AQNP7mIVr3wzsQFly+pJaOQ3flUV7ks1Oz0
			KZS2ccLq4AbA9SYS+pfMJGR/qmvXIBLRr17SmrlUdJdj+I4nxrTB6nW4yMna1KxXtOSXP5HR4QhJRov
			rAfIcSYIiUnurksuXMDSIjYPUIVLweLTlXyhdHaUd/fV4Gf/9k=`
			};

			writeUserImageToDisk(image)
				.then(() => deleteUserImageFromDisk(image.id))
				.then(() => getUserImagePath(image.id).should.not.be.a.file);
		});
	});
});
