// import React, { createContext, useContext, useState, ReactNode } from "react";

// // Define the context
// const MembersContext = createContext(null);

// // Custom hook to use the MembersContext
// export const useMembers = () => useContext(MembersContext);

// // Interface for the provider props
// interface MembersProviderProps {
//   children: ReactNode;
// }

// // Interface for a member
// interface Member {
//   name: string;
//   registration: string;
//   serial: string;
// }

// // Provider component
// export const MembersProvider: React.FC<MembersProviderProps> = ({
//   children,
// }) => {
//   const [members, setMembers] = useState<Member[]>([]);

//   const addMember = (member: Member) => {
//     setMembers([...members, member]);
//   };

//   const editMember = (index: number, updatedMember: Member) => {
//     const newMembers = [...members];
//     newMembers[index] = updatedMember;
//     setMembers(newMembers);
//   };

//   const deleteMember = (index: number) => {
//     const newMembers = members.filter((_, i) => i !== index);
//     setMembers(newMembers);
//   };

//   return (
//     <MembersContext.Provider
//       value={{ members, addMember, editMember, deleteMember }}
//     >
//       {children}
//     </MembersContext.Provider>
//   );
// };
