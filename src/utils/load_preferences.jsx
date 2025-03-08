import { useRef, useState, useEffect } from 'react';
import { ImageUp, FileUp } from 'lucide-react';
import '@styles/side_menu.css'

const Load_profile_picture = ({is_pfp, label}) => {
  const fileInputRef = useRef(null);
  const set_img_to_ls = is_pfp ? 'pageper_profile_img' : 'pageper_banner_img';

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Image = e.target.result;
        localStorage.setItem(set_img_to_ls, base64Image);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="load_config_container" id={label}>
      <input 
        type="file" hidden
        ref={fileInputRef}
        accept="image/*"
        onChange={handleImageSelect}
      />
      <button 
        onClick={triggerFileInput}
        className="upload_conf_button"
      >
        {label}
        <ImageUp size={20}/>
      </button>
    </div>
  );
}


const Load_local_configs = () => {
  const external_json = useRef(null)

  //click handler for button
  const load_file_to_localstorage = () => {
    external_json.current.click();
    
    external_json.current.addEventListener('change', (event) => {
      const fileReader = new FileReader();
      const file = event.target.files[0];

      fileReader.onload = (e) => {
        try {
          const content = e.target.result;
          localStorage.setItem("pageper_external_conf", content);
          console.log("Configuration loaded successfully! Reload the page to apply changes"); } 

        catch (error) {
          console.error("Error loading configuration:", error);}};
        
      fileReader.readAsText(file);  
      window.location.reload();});  }

  return(
    <div className='load_config_container'>
      <input 
        hidden
        type="file" 
        ref={external_json} 
        className="hidden" 
      />

      <button onClick={load_file_to_localstorage} className='upload_conf_button'> 
        {/*no funciona con doble link  <span className="material-symbols-outlined"> upload </span>*/}
        
        <p>Settings</p>
        <FileUp size={20}/>
      </button>

    </div>
  )
}

export default Load_local_configs;
export {Load_profile_picture};
