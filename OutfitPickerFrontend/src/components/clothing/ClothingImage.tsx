const ClothingImage: React.FC<{ imagePath: string | null; altText: string }> = ({
    imagePath,
    altText,
  }) => {
    if (!imagePath) return null;
    
    return (
      
      <div className="mb-3">
        <img
          src={imagePath}
          alt={altText}
          className="img-fluid rounded"
          style={{ height: "200px", objectFit: "contain" }}
        />
      </div>
    );
  };

  export default ClothingImage;