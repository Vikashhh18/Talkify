// export function createWelcomeEmailTemplate(name, clientURL) {
//   return `
//   <!DOCTYPE html>
//   <html lang="en">
//   <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Welcome to Messenger</title>
//   </head>
//   <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
//     <div style="background: linear-gradient(to right, #36D1DC, #5B86E5); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
//       <img src="https://img.freepik.com/free-vector/hand-drawn-message-element-vector-cute-sticker_53876-118344.jpg?t=st=1741295028~exp=1741298628~hmac=0d076f885d7095f0b5bc8d34136cd6d64749455f8cb5f29a924281bafc11b96c&w=1480" alt="Messenger Logo" style="width: 80px; height: 80px; margin-bottom: 20px; border-radius: 50%; background-color: white; padding: 10px;">
//       <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 500;">Welcome to Messenger!</h1>
//     </div>
//     <div style="background-color: #ffffff; padding: 35px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
//       <p style="font-size: 18px; color: #5B86E5;"><strong>Hello ${name},</strong></p>
//       <p>We're excited to have you join our messaging platform! Messenger connects you with friends, family, and colleagues in real-time, no matter where they are.</p>
      
//       <div style="background-color: #f8f9fa; padding: 25px; border-radius: 10px; margin: 25px 0; border-left: 4px solid #36D1DC;">
//         <p style="font-size: 16px; margin: 0 0 15px 0;"><strong>Get started in just a few steps:</strong></p>
//         <ul style="padding-left: 20px; margin: 0;">
//           <li style="margin-bottom: 10px;">Set up your profile picture</li>
//           <li style="margin-bottom: 10px;">Find and add your contacts</li>
//           <li style="margin-bottom: 10px;">Start a conversation</li>
//           <li style="margin-bottom: 0;">Share photos, videos, and more</li>
//         </ul>
//       </div>
      
//       <div style="text-align: center; margin: 30px 0;">
//         <a href=${clientURL} style="background: linear-gradient(to right, #36D1DC, #5B86E5); color: white; text-decoration: none; padding: 12px 30px; border-radius: 50px; font-weight: 500; display: inline-block;">Open Messenger</a>
//       </div>
      
//       <p style="margin-bottom: 5px;">If you need any help or have questions, we're always here to assist you.</p>
//       <p style="margin-top: 0;">Happy messaging!</p>
      
//       <p style="margin-top: 25px; margin-bottom: 0;">Best regards,<br>The Messenger Team</p>
//     </div>
    
//     <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
//       <p>© 2025 Messenger. All rights reserved.</p>
//       <p>
//         <a href="#" style="color: #5B86E5; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
//         <a href="#" style="color: #5B86E5; text-decoration: none; margin: 0 10px;">Terms of Service</a>
//         <a href="#" style="color: #5B86E5; text-decoration: none; margin: 0 10px;">Contact Us</a>
//       </p>
//     </div>
//   </body>
//   </html>
//   `;
// }

export function createWelcomeEmailTemplate(name, clientURL) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Messenger</title>
  </head>
  <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #e0e0e0; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0f172a;">
    <div style="background: linear-gradient(to right, #1e293b, #334155); padding: 30px; text-align: center; border-radius: 12px 12px 0 0; border-bottom: 3px solid #36D1DC;">
      <div style="width: 80px; height: 80px; margin: 0 auto 20px; border-radius: 50%; background: linear-gradient(135deg, #36D1DC, #5B86E5); display: flex; align-items: center; justify-content: center;">
        <svg style="width: 40px; height: 40px; fill: white;" viewBox="0 0 24 24">
          <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
        </svg>
      </div>
      <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: 0.5px;">Welcome to Messenger</h1>
      <p style="color: #94a3b8; margin: 10px 0 0; font-size: 16px;">Your gateway to seamless communication</p>
    </div>
    
    <div style="background-color: #1e293b; padding: 35px; border-radius: 0 0 12px 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.3);">
      <p style="font-size: 18px; background: linear-gradient(to right, #36D1DC, #5B86E5); -webkit-background-clip: text; background-clip: text; color: transparent; font-weight: 600; margin-bottom: 20px;">
        <span style="color: #36D1DC;">Hello ${name},</span>
      </p>
      <p style="color: #cbd5e1; margin-bottom: 20px;">We're excited to have you join our messaging platform! Messenger connects you with friends, family, and colleagues in real-time, no matter where they are.</p>
      
      <div style="background-color: #0f172a; padding: 25px; border-radius: 10px; margin: 25px 0; border-left: 4px solid #36D1DC; border: 1px solid #334155;">
        <p style="font-size: 16px; margin: 0 0 15px 0; color: #36D1DC; font-weight: 600;">
          <svg style="width: 16px; height: 16px; fill: #36D1DC; margin-right: 8px; vertical-align: middle;" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
          Get started in just a few steps:
        </p>
        <ul style="padding-left: 24px; margin: 0;">
          <li style="margin-bottom: 12px; color: #e2e8f0; position: relative; padding-left: 8px;">
            <span style="position: absolute; left: -20px; color: #36D1DC;">•</span>
            Set up your profile picture
          </li>
          <li style="margin-bottom: 12px; color: #e2e8f0; position: relative; padding-left: 8px;">
            <span style="position: absolute; left: -20px; color: #36D1DC;">•</span>
            Find and add your contacts
          </li>
          <li style="margin-bottom: 12px; color: #e2e8f0; position: relative; padding-left: 8px;">
            <span style="position: absolute; left: -20px; color: #36D1DC;">•</span>
            Start a conversation
          </li>
          <li style="margin-bottom: 0; color: #e2e8f0; position: relative; padding-left: 8px;">
            <span style="position: absolute; left: -20px; color: #36D1DC;">•</span>
            Share photos, videos, and more
          </li>
        </ul>
      </div>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${clientURL}" style="background: linear-gradient(to right, #36D1DC, #5B86E5); color: white; text-decoration: none; padding: 14px 35px; border-radius: 8px; font-weight: 500; display: inline-block; transition: all 0.3s; box-shadow: 0 4px 15px rgba(54, 209, 220, 0.3);">
          <svg style="width: 18px; height: 18px; fill: white; vertical-align: middle; margin-right: 8px;" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
          Open Messenger
        </a>
        <p style="color: #94a3b8; font-size: 14px; margin-top: 12px;">
          Click the button above to start your journey
        </p>
      </div>
      
      <div style="background: linear-gradient(90deg, transparent, #334155, transparent); height: 1px; margin: 30px 0;"></div>
      
      <p style="color: #cbd5e1; margin-bottom: 5px;">If you need any help or have questions, our support team is always here to assist you.</p>
      <p style="color: #36D1DC; margin-top: 0; font-weight: 500;">Happy messaging!</p>
      
      <div style="display: flex; align-items: center; margin-top: 25px;">
        <div style="width: 40px; height: 40px; border-radius: 50%; background-color: #334155; display: flex; align-items: center; justify-content: center; margin-right: 15px;">
          <svg style="width: 20px; height: 20px; fill: #36D1DC;" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
        <div>
          <p style="margin: 0; font-weight: 500; color: white;">Best regards,</p>
          <p style="margin: 0; color: #94a3b8;">The Messenger Team</p>
        </div>
      </div>
    </div>
    
    <div style="text-align: center; padding: 25px; color: #64748b; font-size: 13px;">
      <p style="margin: 0 0 15px;">© 2025 Messenger. All rights reserved.</p>
      <div style="display: flex; justify-content: center; gap: 20px;">
        <a href="#" style="color: #94a3b8; text-decoration: none; transition: color 0.3s; font-size: 13px;">
          <svg style="width: 14px; height: 14px; fill: #94a3b8; vertical-align: middle; margin-right: 6px;" viewBox="0 0 24 24">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
          </svg>
          Privacy Policy
        </a>
        <a href="#" style="color: #94a3b8; text-decoration: none; transition: color 0.3s; font-size: 13px;">
          <svg style="width: 14px; height: 14px; fill: #94a3b8; vertical-align: middle; margin-right: 6px;" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 20H4v-4h4v4zm0-6H4v-4h4v4zm0-6H4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4z"/>
          </svg>
          Terms of Service
        </a>
        <a href="#" style="color: #94a3b8; text-decoration: none; transition: color 0.3s; font-size: 13px;">
          <svg style="width: 14px; height: 14px; fill: #94a3b8; vertical-align: middle; margin-right: 6px;" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
          </svg>
          Contact Us
        </a>
      </div>
      <p style="margin: 15px 0 0; font-size: 12px; color: #475569;">
        This email was sent to you as a new member of our messaging community.
      </p>
    </div>
    
    <div style="text-align: center; margin-top: 20px;">
      <div style="display: inline-flex; gap: 15px;">
        <a href="#" style="display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 50%; background-color: #334155; color: #94a3b8; text-decoration: none; transition: all 0.3s;">
          <svg style="width: 16px; height: 16px; fill: currentColor;" viewBox="0 0 24 24">
            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
          </svg>
        </a>
        <a href="#" style="display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 50%; background-color: #334155; color: #94a3b8; text-decoration: none; transition: all 0.3s;">
          <svg style="width: 16px; height: 16px; fill: currentColor;" viewBox="0 0 24 24">
            <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
          </svg>
        </a>
        <a href="#" style="display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 50%; background-color: #334155; color: #94a3b8; text-decoration: none; transition: all 0.3s;">
          <svg style="width: 16px; height: 16px; fill: currentColor;" viewBox="0 0 24 24">
            <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z"/>
          </svg>
        </a>
      </div>
    </div>
  </body>
  </html>
  `;
}