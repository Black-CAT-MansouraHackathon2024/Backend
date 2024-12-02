import { Router } from 'express';
import { 
    createUserController, 
    confirmEmail, 
    loginController, 
    getUserController, 
    updateUserController, 
    getUserProfileController, 
    updateUserProfileController, 
    logoutController, 
    refreshTokenController, 
    uploadProfilePic, 
    forgotPasswordController, 
    addRole, 
    addSkills,
    updatePassword
} from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const  userRouter = Router();

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Registers a new user
 *     description: Creates a new user in the system
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNWIwZjVjN2Y3ZTJkM2Y2ZjhhMjQyIiwiaWF0IjoxNjg0NTg1MTI4fQ.4sHg1XU5-0Wqhsdtwv7ll7bxy-yKYBzHGESD7sRmfuw"
 *                 refreshToken:
 *                   type: string
 *                   example: "dX5bH-kLddVndH8yH6E5yxZyFdm9Bx1ywC1xGRGvjk4"
 *                 message:
 *                   type: string
 *                   example: "User registered successfully"
 *                 userId:
 *                  type: string
 *                 example: "61b0f5c7f7e2d3f6f8a242"
 *       400:
 *         description: Bad request (e.g., invalid input or missing required fields)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid email format"
 *                 message:
 *                   type: string
 *                   example: "Please provide valid input"
 */


/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Logs in an existing user
 *     description: Authenticates a user and returns a token
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     summary: Logs out a user
 *     description: Invalidates the user's refresh token in the database to log them out
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Successfully logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User logged out successfully"
 *       400:
 *         description: Bad request (e.g., token not provided or invalid)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid token"
 *                 message:
 *                   type: string
 *                   example: "Please provide a valid refresh token"
 */

/**
 * @swagger
 * /api/users/refresh_token:
 *   post:
 *     summary: Refreshes a user's token
 *     description: Given a valid refresh token, generates a new access token
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 */
/**
 * @swagger
 * /api/users/forgot_password:
 *   post:
 *     summary: Request a password reset OTP
 *     description: Sends an 8-digit OTP to the user's email address for resetting the password.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user requesting a password reset.
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Password reset OTP sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                   example: Password reset OTP sent successfully.
 *       400:
 *         description: Bad Request – Invalid email format.
 *       404:
 *         description: User not found – No user exists with the provided email address.
 *       500:
 *         description: Internal Server Error – Unexpected error occurred while processing the request.
 */


/**
 * @swagger
 * /api/users/confirm_email:
 *   get:
 *     summary: Confirms a user's email
 *     description: Confirms the user's email by verifying the provided token
 *     tags:
 *       - User
 *     parameters:
 *       - name: email
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *       - name: token
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Email confirmed successfully
 *       400:
 *         description: Invalid token
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Retrieves the user's profile
 *     description: Returns the current user's profile information
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The user's unique ID
 *                 name:
 *                   type: string
 *                   description: The user's name
 *                 bio:
 *                   type: string
 *                   description: The user's biography
 *                 skills:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: A list of skills the user has
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     summary: Updates the user's profile
 *     description: Updates the current user's profile information
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name
 *               bio:
 *                 type: string
 *                 description: The user's biography
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: A list of the user's skills
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The updated user's unique ID
 *                 name:
 *                   type: string
 *                   description: The updated name of the user
 *                 bio:
 *                   type: string
 *                   description: The updated biography of the user
 *                 skills:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: The updated list of skills
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized - User is not authorized to update the profile
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/profile/upload:
 *   put:
 *     summary: Uploads a profile picture
 *     description: Uploads and sets a new profile picture for the user
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePic:
 *                 type: string
 *                 format: binary
 *                 description: The image file to be uploaded as the profile picture
 *     responses:
 *       200:
 *         description: Profile picture uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 profilePic:
 *                   type: string
 *                   description: The URL of the uploaded profile picture
 *       400:
 *         description: File not provided or invalid file type
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Gets a user's profile by ID
 *     description: Retrieves a user profile based on the provided user ID. Only the authorized user can view their own profile.
 *     tags:
 *       - User
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           description: The ID of the user whose profile is to be retrieved
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The user's unique ID
 *                 name:
 *                   type: string
 *                   description: The user's name
 *                 email:
 *                   type: string
 *                   description: The user's email address
 *                 bio:
 *                   type: string
 *                   description: The user's bio or summary
 *                 skills:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: The user's skills
 *                 profilePic:
 *                   type: string
 *                   description: The URL of the user's profile picture
 *       401:
 *         description: Unauthorized – the user is not authorized to view this profile
 *       404:
 *         description: User not found – no user with the provided ID exists
 */

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Updates a user's information by ID
 *     description: Updates the user profile based on the provided user ID. The user must be authorized to update their own profile.
 *     tags:
 *       - User
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           description: The ID of the user whose profile is to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name
 *               email:
 *                 type: string
 *                 description: The user's email address
 *               bio:
 *                 type: string
 *                 description: A short biography or summary of the user
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The user's skills or expertise areas
 *     responses:
 *       200:
 *         description: User information updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The user's unique ID
 *                 name:
 *                   type: string
 *                   description: The updated name of the user
 *                 email:
 *                   type: string
 *                   description: The updated email address of the user
 *                 bio:
 *                   type: string
 *                   description: The updated bio of the user
 *                 skills:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: The updated skills of the user
 *       400:
 *         description: Bad Request – Invalid data provided or missing required fields
 *       401:
 *         description: Unauthorized – the user is not authorized to update this profile
 *       404:
 *         description: User not found – no user with the provided ID exists
 */

/**
 * @swagger
 * /api/users/role:
 *   post:
 *     summary: Assigns a role to a user
 *     description: Assigns a specific role to a user. The user must be authorized to assign roles to other users.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           description: The ID of the user to whom the role is being assigned
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 description: The role to be assigned to the user (e.g., 'investor', 'innovator')
 *     responses:
 *       200:
 *         description: Role assigned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Bad Request – Invalid role or missing data
 *       401:
 *         description: Unauthorized – The user is not authorized to assign a role to this user
 *       404:
 *         description: User not found – No user exists with the provided ID
 */

/**
 * @swagger
 * /api/users/{id}/skills:
 *   post:
 *     summary: Adds skills to a user profile
 *     description: Adds a list of skills to the user's profile.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           description: The ID of the user to whom the skills will be added
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               skills:
 *                 type: array
 *                 description: A list of skills to add to the user's profile
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Skills added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Bad Request – Invalid input data
 *       401:
 *         description: Unauthorized – User is not authorized to modify this profile
 *       404:
 *         description: User not found – No user exists with the provided ID
 */
/**
 * @swagger
 * /api/users/update_password:
 *   post:
 *     summary: Update a user's password
 *     description: Allows a user to update their password after verifying the OTP sent to their email.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *               otp:
 *                 type: string
 *                 description: The 8-digit OTP sent to the user's email.
 *               password:
 *                 type: string
 *                 description: The new password for the user.
 *     responses:
 *       200:
 *         description: Password updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *       400:
 *         description: Bad Request – Invalid input data.
 *       401:
 *         description: Unauthorized – Invalid OTP or user is not authorized to update the password.
 *       404:
 *         description: User not found – No user exists with the provided email address.
 *       500:
 *         description: Internal Server Error – Unexpected error occurred.
 */



userRouter .post('/register', createUserController);
userRouter .post('/login', loginController);
userRouter .post('/logout', logoutController);
userRouter .post('/refresh_token', refreshTokenController);
userRouter .get('/confirm_email/:token', confirmEmail);

userRouter .post('/forgot_password', forgotPasswordController);
userRouter .post('/update_password', updatePassword);

userRouter .get('/profile', authMiddleware, getUserProfileController);
userRouter .put('/profile', authMiddleware, updateUserProfileController);
userRouter .put('/profile/upload', authMiddleware, uploadProfilePic);

userRouter .get('/:id', authMiddleware, getUserController);
userRouter .put('/:id', authMiddleware, updateUserController);

userRouter .post('/role', authMiddleware, addRole);
userRouter .post('/skills', authMiddleware, addSkills);

export default userRouter ;
