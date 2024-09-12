const Loading = () => {
  return (
    <div className="loadingContainer">
      <div className="loading"></div>
      <style>
        {`
			.loadingContainer {
				position: fixed;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				display: flex;
				justify-content: center;
				align-items: center;
				background: rgba(255, 255, 255, 0.75);
				z-index: 9999;
				transition: opacity 0.3s ease-in-out;
			  }

			  .loading {
				width: 50px;
				height: 50px;
				border: 5px solid #f3f3f3;
				border-top: 5px solid #3498db;
				border-radius: 50%;
				animation: spin 1s linear infinite, slideIn 0.5s forwards;
			  }

			  @keyframes spin {
				0% { transform: rotate(0deg); }
				100% { transform: rotate(360deg); }
			  }

			  @keyframes slideIn {
				0% { transform: translateX(-100%); }
				100% { transform: translateX(0); }
			  }


			`}
      </style>
    </div>
  );
};

export default Loading;
