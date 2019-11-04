package com.moneyhub.web.adm;

import java.util.HashMap;

import org.springframework.stereotype.Repository;

@Repository
public interface AdminMapper {
	public Admin selectAdminByIdPw(Admin param);
	public void updateAdmin(Admin param);
	public void insertAdmin(Admin param);
	public int adminCount();
	public void deleteAdmin(String param);
	
	public Admin selectAdmin(HashMap<String, Object> param);
}
