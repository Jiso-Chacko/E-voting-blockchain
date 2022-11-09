
const sgMail = require('@sendgrid/mail');
const { voter, otp } = require('../DB/localDB');
const fs = require('fs');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function makeOtp() {
    var result = "";
    var characters =
      "0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

exports.sendEmail = async (req,res) => {
    try{
        voter.push({
            email: req.body.toAddress,
            walletid : req.body.address,
            password : req.body.password
        });
        const msg = {
            to: `${req.body.toAddress}`, // Change to your recipient
            from: 'suhailshaji@gmail.com', // Change to your verified sender
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

exports.sendOtp = async (req,res) => {
    try {
        const { email } = req.body
        const newOtp = makeOtp();
        otp.push({
            email: email,
            otp: newOtp
        });
        console.log('====================================');
        console.log("Inside send OTP",otp);
        console.log('====================================');
        const findVoter = voter.filter((voter) => voter.email == email)
        if(findVoter){
            const msg = {
                to: `${email}`, // Change to your recipient
                from: 'suhailshaji@gmail.com', // Change to your verified sender
                subject: 'OTP For E-Voting!',
                html: `<body>
                <div style="max-width: 650px;height: 100%;margin: 0 auto;">
                    <header>
                      
                        <p style="text-align: center;font-size: 20px;color: black;font-weight: bold;margin-bottom: 1px;">Welcome To E-Voting using Blockchain!</p>
                    </header>
                    <section style="padding: 15px;color: black;padding-top: 0px;min-height: 200px;">
                        <div style="border-bottom: 3px solid #fbf2f2;">
                        <div style="background-color:#f2f2f2;padding: 15px 15px;margin-bottom: 30px;display: flex;align-items: center;justify-content: center;">
                            <p style="font-size: 15px;margin: 3px;font-weight: bold;padding-bottom: 10px;"><span>OTP: </span>${newOtp}</p>
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
                    message: "successfully send OTP"
                });
                console.log('OTP sent');
            })
            .catch((error) => {
                res.json({
                    success: false,
                    message: error.message
                });
                console.error(error)
                })
        }else{
            res.json({
                success: false,
                message: "Could not find voter!"
            });
        }
    } catch (error) {
        res.json({
            success: false,
            error: error,
            message: error.message
        });
    }
}

exports.getOtp = async (req,res) => {
    try {
        res.json({
            success: true,
            otp: otp,
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

exports.saveFile = async (req, res) => {
    try{
        const dateTime = new Date().toISOString()
        let picPath = `./public/images/${dateTime}.jpeg`;
        fs.writeFile(picPath, req.body.base64Data, 'base64', function(err) {
            if(err){
                res.status(200).json({
                    success: false,  
                    message: err.message
                })
            }else{
                res.status(200).json({
                    success: true,  
                    message: "success"
                })
            }
          });
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}