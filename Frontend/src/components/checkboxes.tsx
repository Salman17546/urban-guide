import React from 'react'

function Checkboxes({ name }: { name: string}) {
  return (
    <div>
        <div className="bg-[#f3f3f3] rounded-xl border-[1px] mb-2 py-[10px] px-4 hover:bg-[#f5f5f5] hover:border-[#D9D9D9]">
<label className="container font-para">{name}
  <input type="checkbox"/>
  <span className="checkmark"></span>
</label>
</div>
      
    </div>
  )
}

export default Checkboxes
