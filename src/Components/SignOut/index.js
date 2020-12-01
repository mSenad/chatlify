import React from "react";

function SignOut({ auth }) {
  return (
    auth.currentUser && (
      <button
        onClick={() => {
          auth.signOut();
        }}
      >
        SignOut
      </button>
    )
  );
}

export default SignOut;
