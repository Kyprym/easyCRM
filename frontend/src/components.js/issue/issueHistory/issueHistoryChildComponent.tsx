import { motion } from "framer-motion";

export interface historyData {
  user_creater_id: number;
  create_time: string;
  action_type: string;
  icon: JSX.Element;
}

const hostoryChildComonentStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: "2rem 0.5rem 0.5rem 2rem",
  fontSize: "1.5rem",
  margin: '0.5rem',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
};

const dateTimeStyle = {
  fontSize: "1rem",
  marginLeft: '0.8rem',
  color: '#666',
};


const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export const IssueHistoryChildComponent = ({
  user_creater_id,
  create_time,
  action_type,
  icon,
}: historyData): JSX.Element => {
  return (
    <motion.div

      initial="hidden"
      animate="visible"
      exit="exit"
      variants={itemVariants}
      transition={{ duration: 0.3 }}
    
      style={hostoryChildComonentStyle}
     
    >
      <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start"}}>
        {icon}
        <div>
          <span style={dateTimeStyle}>{create_time}</span>
          <div>
            <span style={{ paddingLeft: "0.5rem" }}>
              Пользователь <span style={{color:"#04509cff"}}>{user_creater_id}</span>
            </span>
            <span style={{ paddingLeft: "0.5rem" }}>{action_type}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};