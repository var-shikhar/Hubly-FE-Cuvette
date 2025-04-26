import { Link } from "react-router-dom"
import DISCORD_ICON from "../assets/logo/discord.svg?react"
import FRAMER_ICON from "../assets/logo/figma.svg?react"
import INSTAGRAM_ICON from "../assets/logo/instagram.svg?react"
import LINKEDIN_ICON from "../assets/logo/linkedin.svg?react"
import EMAIL_ICON from "../assets/logo/mail.svg?react"
import TWIITER_ICON from "../assets/logo/twitter.svg?react"
import YOUTUBE_ICON from "../assets/logo/youtube.svg?react"
import "./css/footer.css"
import LogoWrapper from "./logo-wrapper"

const PublicFooter = () => {
  return (
    <div className="landing_footer-container">
      <div className="footer-wrapper landing_margin">
        <div className="footer-btn-wrapper">
          <LogoWrapper />
        </div>
        <div className="footer-sub-wrapper">
          <div className="footer-item-wrapper">
            <div>Product</div>
            <Link to="../universal-checkout">Universal checkout</Link>
            <Link to="../payment-workflows">Payment workflows</Link>
            <Link to="../observability">Observability</Link>
            <Link to="../upliftai">UpliftAI</Link>
            <Link to="../integrations">Apps & integrations</Link>
          </div>

          <div className="footer-item-wrapper">
            <div>Why Primer</div>
            <Link to="../expand-to-new-markets">Expand to new markets</Link>
            <Link to="../boost-payment-success">Boost payment success</Link>
            <Link to="../improve-conversion-rates">
              Improve conversion rates
            </Link>
            <Link to="../reduce-payments-fraud">Reduce payments fraud</Link>
            <Link to="../recover-revenue">Recover revenue</Link>
          </div>
          <div className="footer-item-wrapper">
            <div>Developers</div>
            <Link to="../primer-docs">Primer Docs</Link>
            <Link to="../api-references">API Reference</Link>
            <Link to="../payment-methods-guide">Payment methods guide</Link>
            <Link to="../service-status">Service status</Link>
            <Link to="../community">Community</Link>
          </div>
          <div className="footer-item-wrapper">
            <div>Resources</div>
            <Link to="../blog">Blog</Link>
            <Link to="../success-stories">Success stories</Link>
            <Link to="../news-room">News room</Link>
            <Link to="../terms-and-conditions">Terms</Link>
            <Link to="../privacy-policy">Privacy</Link>
          </div>
          <div className="footer-item-wrapper">
            <div>Company</div>
            <Link to="../about-hubly">Careers</Link>
          </div>
          <div className="footer-item-wrapper">
            <div className="footer-icons">
              {[
                EMAIL_ICON,
                LINKEDIN_ICON,
                TWIITER_ICON,
                YOUTUBE_ICON,
                DISCORD_ICON,
                FRAMER_ICON,
                INSTAGRAM_ICON,
              ].map((ICON, i) => (
                <ICON key={i} width={25} height={25} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default PublicFooter
