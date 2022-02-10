import Head from 'next/head';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { useCurves } from '../hooks/useCurves';
import styles from '../styles/Landing.module.scss';

const Landing = () => {
  const { layeredTopWave, layeredBottomWave, layeredTopWave2, blob } =
    useCurves();
  return (
    <div>
      <Head>
        <title>myHomeBoard</title>
        <meta
          name='description'
          content={'Home Climbing Board Management App'}
        />
        <meta
          name='keywords'
          content={
            'climbing, climb, bouldering, board, boardclimbing, homeboard, homewall'
          }
        />
        <link rel='icon' href='/favicon.png' />
      </Head>

      <div className={styles.body}>
        <div className={styles.start}>
          <div className={styles.startAnimation}>
            <svg
              className={styles.logo}
              height='230px'
              xmlns='http://www.w3.org/2000/svg'
              width='230px'
              version='1.1'
              viewBox='0 0 1526 1526'
            >
              <path
                d='M10.7005+759.379C10.7005+345.185+346.487+9.41345+760.7+9.41345C1174.91+9.41345+1510.7+345.185+1510.7+759.379C1510.7+1173.57+1174.91+1509.35+760.7+1509.35C346.487+1509.35+10.7005+1173.57+10.7005+759.379Z'
                fillRule='evenodd'
                fill='#e9c46a'
                opacity='1'
              />
              <path
                stroke='#1c1c31'
                strokeWidth='9.23953'
                d='M544.585+253.886C540.035+258.891+518.847+285.034+518.847+285.034L518.052+316.071L534.366+331.191L576.533+322.465L603.824+358.201L573.389+360.286L565.468+382.383L602.574+391.138L630.453+417.409L670.773+483.863L669.761+492.597L646.917+514.595L663.839+525.594L662.147+531.517L704.455+545.887L762.83+638.122L730.679+648.275L726.448+677.042L756.061+702.424L793.568+711.632L912.912+849.916L841.648+854.405L837.284+876.715L864.358+895.329L911.229+917.252L922.696+936.72L949.077+986.96L925.819+1003.5L937.224+1044.84L960.258+1073.71L983.09+1087.71L1048.98+1058.01L1020.46+1160.61L1096.25+1169.81'
                fill='none'
                strokeLinecap='round'
                opacity='1'
                strokeLinejoin='round'
              />
              <path
                stroke='#1c1c31'
                strokeWidth='9.23953'
                d='M377.571+241.921L397.588+262.762L429.864+268.436L447.541+252.232L423.236+248.55L377.571+241.921Z'
                fill='none'
                strokeLinecap='round'
                opacity='1'
                strokeLinejoin='round'
              />
              <path
                stroke='#1c1c31'
                strokeWidth='9.23953'
                d='M470.055+322.884L460.48+304.471L429.547+297.842L445.75+322.148L470.055+322.884Z'
                fill='none'
                strokeLinecap='round'
                opacity='1'
                strokeLinejoin='round'
              />
              <path
                stroke='#1c1c31'
                strokeWidth='9.23953'
                d='M485.838+348.342L467.618+355.042L482.296+364.279L485.838+348.342Z'
                fill='none'
                strokeLinecap='round'
                opacity='1'
                strokeLinejoin='round'
              />
              <path
                stroke='#1c1c31'
                fillRule='evenodd'
                strokeWidth='9.23953'
                d='M444.752+520.155L399.559+540.395L376.926+565.388L372.199+594.874L387.625+618.157L426.329+637.663L434.195+650.215L427.284+692.548L453.202+737.473L477.824+763.391L505.47+785.421L549.099+879.158L574.585+865.767L603.526+914.147L660.978+921.923L711.95+956.48L767.674+974.623L788.648+1018.42L822.625+1060.8L885.471+1133.02L891.886+1128.8L902.603+1145.2L907.986+1169.46L927.549+1174.76L954.248+1164.32L978.611+1154.87L1009.76+1148.96L1024+1138.17L1015.23+1123.16L987.947+1125.34L945.65+1122.68L926.245+1114.69L905.048+1090.63L879.402+1043.27L845.577+982.368L822.824+925.407L766.984+890.124L707.648+839.231L720.356+823.204L724.717+802.231L750.915+852.429L772.302+894.237L804.586+914.138L849.237+889.343L831.591+870.9L806.072+873.195L793.177+842.197L769.304+787.196L755.805+731.078L741.611+708.098L699.737+726.748L650.84+777.636L638.623+766.423L615.303+721.662L582.501+681.796L603.054+675.354L615.966+653.428L627.527+624.641L628.376+603.433L632.16+570.18L638.656+562.45L648.746+535.472L661.757+525.091L640.129+513.438L623.314+526.71L615.461+559.942L595.166+608.073L574.122+641.756L535.044+648.577L514.276+638.317L512.872+616.576L521.852+583.611L522.178+550.415L525.055+527.277L531.485+492.52L524.567+439.361L517.448+379.633L530.154+352.562L523.612+333.724L523.82+324.305L506.769+319.92L503.957+332.731L498.404+355.979L495.316+367.337L493.174+388.641L485.482+442.912L476.748+481.745L476.268+521.14L475.513+546.836L469.882+540.788L471.833+533.334L464.79+529.838L444.752+520.155Z'
                fill='#1c1c31'
                strokeLinecap='round'
                opacity='1'
                strokeLinejoin='round'
              />
              <path
                d='M769.198+898.903L799.934+918.903L810.623+909.309L774.411+887.765L769.198+898.903Z'
                fillRule='evenodd'
                fill='#1c1c31'
                opacity='1'
              />
              <path
                stroke='#1c1c31'
                fillRule='evenodd'
                strokeWidth='9.23953'
                d='M329.605+158.276L1194.51+159.519L1193.62+1355.14L1145.26+1356.59L1030.63+1152.73L680.54+530.152L673.674+517.942L510.347+227.49L327.036+224.861L329.605+158.276Z'
                fill='#1c1c31'
                strokeLinecap='round'
                opacity='1'
                strokeLinejoin='round'
              />
              <path
                stroke='#1c1c31'
                strokeWidth='9.23953'
                d='M618.707+408.259L500.075+407.433L327.565+225.046'
                fill='none'
                strokeLinecap='round'
                opacity='1'
                strokeLinejoin='round'
              />
            </svg>
          </div>

          <Link href='/boards'>
            <a className='btn btn-start'>
              <strong>GET STARTED</strong>
            </a>
          </Link>
        </div>
        <section className='yellow'>
          {layeredTopWave(
            '120',
            '#1c1c31',
            '#e76f51',
            '#eb8550',
            '#ebb05d',
            '#ebb05d'
          )}
          <div className={styles.content}>
            <h1>MyHomeBoard</h1>
            <p>
              Upload a photo of your home climbing board. Save, grade and rate
              problems. Share them with friends and register ascents.
            </p>
          </div>
        </section>
        <section className='orange'>
          {layeredTopWave(
            '160',
            '#e9c46a',
            '#ebb05d',
            '#eb8550',
            '#eb8550',
            '#e76f51'
          )}
          <div className={styles.content}>
            <h1>Create Problems</h1>
            <p>
              Create your own problems. Use green for start holds, blue for hand
              holds, yellow for feet-only and red for top holds. Specify your
              rules if needed, and suggest a grade.
            </p>
          </div>
        </section>
        <section>
          {layeredTopWave('180px')}
          <div className={styles.content}>
            <h1>Browse Problems</h1>
            <p>
              After choosing a board, browse its problems with grade and rating
              (or project status if unclimbed). A checkmark will appear on
              problems you have climbed.
            </p>
          </div>
        </section>
        <section className='purple'>
          {layeredTopWave2()}
          <div className={styles.content}>
            <h1>Register Ascents</h1>
            <p>
              When you top out a problem, register your ascent. Suggest a grade
              and a star-rating. The grade and rating of the problem is decided
              by the average of all ascentionist suggestions.
            </p>
            <Link href='/login'>
              <a className='btn' style={{ marginTop: '3.5rem' }}>
                <strong>GET STARTED</strong>
              </a>
            </Link>
          </div>

          {layeredBottomWave('350')}
        </section>

        <footer>
          {blob}
          <div className={styles.footerContent}>
            <a
              href='https://github.com/oddgrd'
              target='_blank'
              rel='noreferrer'
            >
              <p>
                oddgrd <FaGithub />
              </p>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
