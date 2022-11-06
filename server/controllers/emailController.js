
const sgMail = require('@sendgrid/mail');
const voter = require('../DB/localDB');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendEmail = async (req,res) => {
    try{
        voter.push({
            email: req.body.toAddress,
            walletid : req.body.address,
            password : req.body.password
        });
        const msg = {
            to: `${req.body.toAddress}`, // Change to your recipient
            from: 'jisochacko007@gmail.com', // Change to your verified sender
            subject: 'Welcome to E-Voting!',
            html: `<body>
            <div style="max-width: 650px;height: 100%;margin: 0 auto;">
                <header>
                  
                    <p style="text-align: center;font-size: 20px;color: black;font-weight: bold;margin-bottom: 1px;">Welcome To E-Voting using Blockchain!</p>
                </header>
                <section style="padding: 15px;color: black;padding-top: 0px;min-height: 200px;">
                    <div style="border-bottom: 3px solid #fbf2f2;">
                    <P style="text-align: center;">We are excited to have you.</P>
                    <p>Your login credentials for E-Voting are listed below.</p>
                    <div style="background-color:#f2f2f2;padding: 15px 15px;margin-bottom: 30px;">
                        <p style=" margin: 3px;font-weight: bold;padding-bottom: 10px;"><span>EMAIL: </span>${req.body.toAddress}</p>
                         <p style=" margin: 3px;font-weight: bold;padding-bottom: 10px;"><span>WALLET ID: </span>Your wallet ID</p>
                        <p style=" margin: 3px;font-weight: bold;padding-bottom: 10px;"style=" margin: 3px;font-weight: bold;padding-bottom: 10px;"><span>PASSWORD: </span>${req.body.password}</p>
                    </div>
             
                    <p style="font-weight: bold;padding-top: 30px;padding-bottom: 10px;">The E-voting Blockchain Team</p>
                    </div>
                     <footer>
                        <p style="opacity: 0.5;font-size: 14px;">You're receiving this email because you are added by E-Voting Blockchain team.</p>
                        <p style="opacity: 0.5;font-size: 14px;padding-bottom: 16px;">If you have any questions contact us........</p>
                        <img src="" alt="" style="display: block;margin-right: auto;width: 35%;margin-left: 0px;">
                        <p style="opacity: 0.5;font-size: 14px;padding-top: 16px;">Copyright &#169; 2022 E-Voting Blockchain</p>
                    </footer>
                </section>
            </div>
            </body>`,
          }

          sgMail
        .send(msg)
        .then(() => {
            res.json({
                success: true,
                message: "successfully send email"
            });
            console.log('Email sent')
        })
        .catch((error) => {
            res.json({
                success: false,
                message: error.message
            });
            console.error(error)
            })
    }catch(error){
        res.json({
            success: false,
            error: error,
            message: error.message
        });
    }
}

exports.getVoters = async (req,res) => {
    try {
        res.json({
            success: true,
            voters: voter,
            message: "success"
        });
    } catch (error) {
        res.json({
            success: false,
            error: error,
            message: error.message
        });
    }
}