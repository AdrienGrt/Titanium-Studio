// app/api/contact/route.ts
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: `"Studio Jam High" <${process.env.SMTP_USER}>`,
      to: 'direction@jam-high.com',
      subject: `🎵 Nouveau contact - ${data.name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nouvelle demande de contact</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
          <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td align="center" style="padding: 40px 0;">
                <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                  
                  <!-- Header -->
                  <tr>
                    <td style="padding: 40px 40px 30px 40px; background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); text-align: center;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                        🎵 Studio Jam High
                      </h1>
                      <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px; opacity: 0.9;">
                        Nouvelle demande de contact
                      </p>
                    </td>
                  </tr>

                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px;">
                      
                      <!-- Info client -->
                      <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                        <tr>
                          <td style="padding: 20px; background-color: #f9fafb; border-left: 4px solid #ef4444; border-radius: 8px;">
                            <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 20px;">
                              Informations du contact
                            </h2>
                            
                            <table role="presentation" style="width: 100%; border-collapse: collapse;">
                              <tr>
                                <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 140px;">
                                  <strong>👤 Nom :</strong>
                                </td>
                                <td style="padding: 8px 0; color: #1f2937; font-size: 14px;">
                                  ${data.name}
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">
                                  <strong>📧 Email :</strong>
                                </td>
                                <td style="padding: 8px 0;">
                                  <a href="mailto:${data.email}" style="color: #ef4444; text-decoration: none; font-size: 14px;">
                                    ${data.email}
                                  </a>
                                </td>
                              </tr>
                              ${data.phone ? `
                              <tr>
                                <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">
                                  <strong>📱 Téléphone :</strong>
                                </td>
                                <td style="padding: 8px 0;">
                                  <a href="tel:${data.phone}" style="color: #ef4444; text-decoration: none; font-size: 14px;">
                                    ${data.phone}
                                  </a>
                                </td>
                              </tr>
                              ` : ''}
                              ${data.artistName ? `
                              <tr>
                                <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">
                                  <strong>🎤 Nom d'artiste :</strong>
                                </td>
                                <td style="padding: 8px 0; color: #1f2937; font-size: 14px;">
                                  ${data.artistName}
                                </td>
                              </tr>
                              ` : ''}
                            </table>
                          </td>
                        </tr>
                      </table>

                      <!-- Message -->
                      ${data.message ? `
                      <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                        <tr>
                          <td style="padding: 20px; background-color: #fef2f2; border-left: 4px solid #ef4444; border-radius: 8px;">
                            <h3 style="margin: 0 0 12px 0; color: #1f2937; font-size: 16px;">
                              💬 Message
                            </h3>
                            <p style="margin: 0; color: #374151; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">
                              ${data.message}
                            </p>
                          </td>
                        </tr>
                      </table>
                      ` : ''}

                      <!-- Détails de la séance -->
                      ${data.sessionType || data.duration || data.services ? `
                      <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                        <tr>
                          <td style="padding: 20px; background-color: #f3f4f6; border-radius: 8px;">
                            <h3 style="margin: 0 0 15px 0; color: #1f2937; font-size: 16px;">
                              📋 Détails de la séance simulée
                            </h3>
                            ${data.sessionType ? `<p style="margin: 5px 0; color: #374151; font-size: 14px;"><strong>Type :</strong> ${data.sessionType}</p>` : ''}
                            ${data.duration ? `<p style="margin: 5px 0; color: #374151; font-size: 14px;"><strong>Durée :</strong> ${data.duration}</p>` : ''}
                            ${data.services ? `<p style="margin: 5px 0; color: #374151; font-size: 14px;"><strong>Services :</strong> ${data.services}</p>` : ''}
                            ${data.budget ? `<p style="margin: 5px 0; color: #374151; font-size: 14px;"><strong>Budget :</strong> ${data.budget}</p>` : ''}
                          </td>
                        </tr>
                      </table>
                      ` : ''}

                      <!-- CTA Button -->
                      <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 30px 0;">
                        <tr>
                          <td align="center">
                            <a href="mailto:${data.email}" style="display: inline-block; padding: 14px 30px; background-color: #ef4444; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                              Répondre au client
                            </a>
                          </td>
                        </tr>
                      </table>

                      <!-- Données complètes -->
                      <details style="margin-top: 30px;">
                        <summary style="cursor: pointer; color: #6b7280; font-size: 14px; padding: 10px; background-color: #f9fafb; border-radius: 4px;">
                          📊 Voir toutes les données (JSON)
                        </summary>
                        <pre style="margin: 10px 0 0 0; padding: 15px; background-color: #1f2937; color: #10b981; border-radius: 4px; overflow-x: auto; font-size: 12px; line-height: 1.5;">${JSON.stringify(data, null, 2)}</pre>
                      </details>

                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="padding: 30px 40px; background-color: #1f2937; text-align: center;">
                      <p style="margin: 0 0 10px 0; color: #9ca3af; font-size: 14px;">
                        Studio Jam High - Formulaire de contact
                      </p>
                      <p style="margin: 0; color: #6b7280; font-size: 12px;">
                        📞 06 05 88 58 12 | 📧 direction@jam-high.com
                      </p>
                      <p style="margin: 10px 0 0 0; color: #4b5563; font-size: 11px;">
                        Email envoyé le ${new Date().toLocaleDateString('fr-FR', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erreur:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi' },
      { status: 500 }
    )
  }
}